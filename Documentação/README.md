# Documentação
Esta secção serve para apresentar informação sobre a conceção e implementação do projeto.

## Secções disponíveis
- Design: Informações sobre a construção da aplicação
    - ReadMe: Apresentação da secção
    - Apresentacao: Apresentação do projeto
    - Arquitetura: Descrição da arquitetura da aplicação utilizando uma combinação do modelo C4 e 4+1
- API: Lista detalhada dos *endpoints* das APIs desenvolvidas
    - ReadMe: Apresentação da secção
    - RedeMasterData: Detalhes da API da aplicação Rede Master Data
    - ViagemMasterData: Detalhes da API da aplicação Viagem Master Data
- Glossário: Lista de termos e abreviaturas e respetivos significados utilizados na redação desta documentação
- Anexos: documentos e ficheiros de apoio
    - Postman: Coleção postman para fazer pedidos aos web services
    - Exemplos: Ficheiros de exemplo para usar num web service ou extrações de resultados de execução do web service.

## Lista de aplicações e configurações padrão
| Serviço          | Port Local | Port Kubernets | Tecnologia de Implementação |
|----------------  |------------|----------------|-----------------------------|
| ImportGLX        | 3002       | 80             | Node.JS                     |
| RedeMasterData   | 3003       | 80             | Node.JS                     |
| ViagemMasterData | 3004       | 80             | C#                          |
| Viajantes2 SPA   | 4200       | 80             | Angular                     |

## Plataforma de alojamento das aplicações e serviços
| Aplicação/Serviço                  | Plataforma de Alojamento | Tipo de Alojamento    |
|------------------------------------|--------------------------|-----------------------|
| ImportGLX                          | Linode                   | Kubernets Cluster     |
| RedeMasterData                     | Linode                   | Kubernets Cluster     |
| ViagemMasterData                   | Linode                   | Kubernets Cluster     |
| Viajantes2 SPA                     | Linode                   | Kubernets Cluster     |
| Base de dados MongoDB              | Microsoft Azure          | MongoDB Cloud (Atlas) |
| Base de dados Microsoft SQL Server | Microsoft Azure          | Base de Dados SQL     |
| Repositório GIT                    | Bitbucket                | Servidor GIT          |
| Pipeline CI/CD                     | Bitbucket                | Bitbucket Pipelines   |