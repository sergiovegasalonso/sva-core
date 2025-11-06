/**
 * Script to automate creation of a new subdomain with all layers and tests
 * Usage: deno run --allow-run cli/create-subdomain.ts <SubdomainName>
 */

const PREFIX = "Sva";

async function runCommand(command: string): Promise<void> {
  console.log(`\n> ${command}`);
  
  const cmd = new Deno.Command("sh", {
    args: ["-c", command],
    stdout: "inherit",
    stderr: "inherit",
  });
  
  const { code } = await cmd.output();
  
  if (code !== 0) {
    console.error(`Command failed with exit code ${code}`);
    Deno.exit(code);
  }
}

async function createSubdomain(subdomain: string): Promise<void> {
  console.log(`\n🚀 Creating subdomain: ${subdomain}\n`);
  
  // Application layer
  console.log("📦 Creating Application layer...");
  await runCommand(`dotnet new classlib -n ${PREFIX}.${subdomain}.Application -o ${subdomain}/src/Application`);
  await runCommand(`dotnet sln add --in-root ${subdomain}/src/Application/${PREFIX}.${subdomain}.Application.csproj`);
  await Deno.writeTextFile(`${subdomain}/src/Application/GlobalUsings.cs`, "");
  await Deno.writeTextFile(`${subdomain}/src/Application/DependencyInjection.cs`, `namespace Microsoft.Extensions.DependencyInjection;

public static class DependencyInjection
{
    public static void AddApplicationServices(this IHostApplicationBuilder builder)
    {
    }
}`);
  await runCommand(`dotnet new mstest -n ${PREFIX}.${subdomain}.Application.FunctionalTests -o ${subdomain}/test/Application.FunctionalTests`);
  await runCommand(`dotnet sln add --in-root ${subdomain}/test/Application.FunctionalTests/${PREFIX}.${subdomain}.Application.FunctionalTests.csproj`);
  await runCommand(`dotnet new mstest -n ${PREFIX}.${subdomain}.Application.UnitTests -o ${subdomain}/test/Application.UnitTests`);
  await runCommand(`dotnet sln add --in-root ${subdomain}/test/Application.UnitTests/${PREFIX}.${subdomain}.Application.UnitTests.csproj`);
  
  // Domain layer
  console.log("\n📦 Creating Domain layer...");
  await runCommand(`dotnet new classlib -n ${PREFIX}.${subdomain}.Domain -o ${subdomain}/src/Domain`);
  await runCommand(`dotnet sln add --in-root ${subdomain}/src/Domain/${PREFIX}.${subdomain}.Domain.csproj`);
  await Deno.writeTextFile(`${subdomain}/src/Domain/GlobalUsings.cs`, "");
  await runCommand(`dotnet new mstest -n ${PREFIX}.${subdomain}.Domain.UnitTests -o ${subdomain}/test/Domain.UnitTests`);
  await runCommand(`dotnet sln add --in-root ${subdomain}/test/Domain.UnitTests/${PREFIX}.${subdomain}.Domain.UnitTests.csproj`);

  // API layer
  console.log("\n📦 Creating API layer...");
  await runCommand(`dotnet new grpc -n ${PREFIX}.${subdomain}.API -o ${subdomain}/src/API`);
  await runCommand(`dotnet sln add --in-root ${subdomain}/src/API/${PREFIX}.${subdomain}.API.csproj`);
  await Deno.writeTextFile(`${subdomain}/src/API/GlobalUsings.cs`, "");
  await runCommand(`dotnet new mstest -n ${PREFIX}.${subdomain}.API.AcceptanceTests -o ${subdomain}/test/API.AcceptanceTests`);
  await runCommand(`dotnet sln add --in-root ${subdomain}/test/API.AcceptanceTests/${PREFIX}.${subdomain}.API.AcceptanceTests.csproj`);

  // Infrastructure layer
  console.log("\n📦 Creating Infrastructure layer...");
  await runCommand(`dotnet new classlib -n ${PREFIX}.${subdomain}.Infrastructure -o ${subdomain}/src/Infrastructure`);
  await runCommand(`dotnet sln add --in-root ${subdomain}/src/Infrastructure/${PREFIX}.${subdomain}.Infrastructure.csproj`);
  await Deno.writeTextFile(`${subdomain}/src/Infrastructure/GlobalUsings.cs`, "");
  await runCommand(`dotnet new mstest -n ${PREFIX}.${subdomain}.Infrastructure.IntegrationTests -o ${subdomain}/test/Infrastructure.IntegrationTests`);
  await runCommand(`dotnet sln add --in-root ${subdomain}/test/Infrastructure.IntegrationTests/${PREFIX}.${subdomain}.Infrastructure.IntegrationTests.csproj`);

  // Project dependencies
  console.log("\n🔗 Setting up project dependencies...");
  await runCommand(`dotnet add ${subdomain}/src/Application/${PREFIX}.${subdomain}.Application.csproj reference ${subdomain}/src/Domain/${PREFIX}.${subdomain}.Domain.csproj`);
  await runCommand(`dotnet add ${subdomain}/src/API/${PREFIX}.${subdomain}.API.csproj reference ${subdomain}/src/Application/${PREFIX}.${subdomain}.Application.csproj`);
  await runCommand(`dotnet add ${subdomain}/src/API/${PREFIX}.${subdomain}.API.csproj reference ${subdomain}/src/Infrastructure/${PREFIX}.${subdomain}.Infrastructure.csproj`);
  await runCommand(`dotnet add ${subdomain}/src/Infrastructure/${PREFIX}.${subdomain}.Infrastructure.csproj reference ${subdomain}/src/Application/${PREFIX}.${subdomain}.Application.csproj`);

  await runCommand(`dotnet add ${subdomain}/test/Application.FunctionalTests/${PREFIX}.${subdomain}.Application.FunctionalTests.csproj reference ${subdomain}/src/API/${PREFIX}.${subdomain}.API.csproj`);
  await runCommand(`dotnet add ${subdomain}/test/Application.UnitTests/${PREFIX}.${subdomain}.Application.UnitTests.csproj reference ${subdomain}/src/Application/${PREFIX}.${subdomain}.Application.csproj`);
  await runCommand(`dotnet add ${subdomain}/test/Application.UnitTests/${PREFIX}.${subdomain}.Application.UnitTests.csproj reference ${subdomain}/src/Infrastructure/${PREFIX}.${subdomain}.Infrastructure.csproj`);
  await runCommand(`dotnet add ${subdomain}/test/Domain.UnitTests/${PREFIX}.${subdomain}.Domain.UnitTests.csproj reference ${subdomain}/src/Domain/${PREFIX}.${subdomain}.Domain.csproj`);

  await runCommand(`dotnet format ./${PREFIX}.Core.sln`);
  console.log(`\n✅ Subdomain '${subdomain}' created successfully!`);
}

// Main execution
if (import.meta.main) {
  const subdomain = Deno.args[0];
  
  if (!subdomain) {
    console.error("❌ Error: Subdomain name is required");
    console.log("\nUsage: deno run --allow-run create-subdomain.ts <SubdomainName>");
    console.log("Example: deno run --allow-run create-subdomain.ts Login");
    Deno.exit(1);
  }
  
  await createSubdomain(subdomain);
}
