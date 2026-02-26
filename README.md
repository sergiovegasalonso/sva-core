# pending tasks

https://abp.io/architecture/modular-monolith

0. globalusings, dependency injections and good practices(JsonTaylor)
1. SIncornización entre el contexto de lectura y el de escritura
2. cómo solucionar el problema de elementos  compartidos entre microservicios
3. openapi

## architecture key points

Resumen de elementos clave para una arquitectura de microservicios basada en .NET y servicios Azure:

1. Balanceador de carga
    - **Azure Application Gateway**: Balanceo de carga a nivel de aplicación, terminación SSL, firewall de aplicaciones web (WAF) y enrutamiento basado en URL.
    - **Azure Load Balancer**: Balanceo de carga a nivel de red, distribuye tráfico TCP/UDP entre máquinas virtuales para alta disponibilidad.

2. Aplicaciones ASP.NET (Microservicios)
    - **Azure App Service**: Hospedaje de aplicaciones web, APIs y backends en un entorno gestionado y escalable.
    - **Azure Kubernetes Service (AKS)**: Orquestación y gestión de contenedores a gran escala usando Kubernetes.
    - **Azure Container Instances (ACI)**: Ejecución rápida y sencilla de contenedores sin necesidad de administrar servidores.

3. API Gateway
    - **Azure API Management**: Gestión, seguridad, versionado, monitoreo y publicación de APIs para exponer servicios de manera controlada.

4. Comunicación entre microservicios (mensajería/eventos)
    - **Azure Service Bus**: Mensajería empresarial confiable mediante colas y topics para desacoplar servicios.
    - **Azure Event Grid**: Distribución de eventos en tiempo real para arquitecturas orientadas a eventos.
    - **Azure Event Hubs**: Ingesta y procesamiento de grandes volúmenes de eventos y telemetría en tiempo real.

5. Almacenamiento de datos
    - **Azure SQL Database**: Base de datos relacional como servicio, escalable y gestionada.
    - **Azure Cosmos DB**: Base de datos NoSQL multi-modelo, distribuida globalmente y con baja latencia.
    - **Azure Table Storage**: Almacenamiento NoSQL sencillo y económico para grandes volúmenes de datos estructurados.
    - **Azure Blob Storage**: Almacenamiento de objetos para archivos, imágenes, backups y datos no estructurados.

6. Autenticación y autorización
    - **Azure Active Directory (Azure AD)**: Servicio de identidad y acceso para usuarios, aplicaciones y recursos.
    - **Azure AD B2C**: Gestión de identidades y autenticación para usuarios externos (clientes, partners).

7. Monitorización y logging
    - **Azure Monitor**: Recopilación y análisis de telemetría, métricas y alertas para recursos de Azure.
    - **Azure Application Insights**: Monitorización de rendimiento y diagnóstico para aplicaciones .NET y otras plataformas.
    - **Azure Log Analytics**: Análisis centralizado de logs y consultas avanzadas sobre datos de telemetría.

8. CI/CD y DevOps
    - **Azure DevOps**: Herramientas para CI/CD, gestión de repositorios, tableros de trabajo y automatización de despliegues.
    - **GitHub Actions**: Automatización de flujos de trabajo de CI/CD e integración directa con servicios de Azure.

9. Seguridad y gestión de secretos
    - **Azure Key Vault**: Almacenamiento seguro y gestión centralizada de secretos, certificados y claves de cifrado.

10. Escalabilidad y alta disponibilidad
    - **Azure Scale Sets**: Implementación y administración automática de grupos de máquinas virtuales escalables.
    - **Azure Traffic Manager**: Distribución global del tráfico de usuarios para alta disponibilidad y rendimiento.

11. Integración con sistemas externos
    - **Azure Logic Apps**: Automatización e integración de flujos de trabajo entre servicios y sistemas externos.
    - **Azure Functions**: Ejecución de código serverless bajo demanda para tareas ligeras y eventos.

12. Caching
    - **Azure Cache for Redis**: Almacenamiento en caché distribuido de alta velocidad para mejorar el rendimiento de aplicaciones.
