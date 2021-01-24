## Nível 3 - Viagem Data Viagem
O Master Data Viagem será construido seguindo uma arquitetura por camadas. Inicialmente o request chegado ao servidor será passado para o controller que passara a informação para a camada de Service através de um DTO. A camada Service, responsável por inicialmente enviar os dados para o Domínio cujo a responsabilidade é conhecer as regras de negocio e que vai validar o pedido. Após ser validado os dados são devolvidos ao service para serem enviado para o repositório. O repositório por sua vez irá fazer o processo de persistência usando um DataScheema que são uma representação do que existe no base de dados Microsoft SQL Server.
#### Vista Lógica
![Diagrama de Nível 3](Diagramas/N3-PROC-VMD.jpg)
#### Vista de Processo
![Diagrama de Nível 3](Diagramas/N3-SSD-VMD.jpg)
#### Vista Implementação
![Diagrama de Nível 3](Diagramas/N3-IMP-VMD.jpg)