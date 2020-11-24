# Rede Master Data - Nodes
Rede Master Data é responsavel por gerir as informação sobre a rede armazenada na base de dados.

## [GET] /api/nodes
Obtem um lista de todos os nós registados no sistema
| Versão | Protocolo | Transporte | Autorização |
|--------|-----------|------------|-------------|
| 1.0    | REST      | HTTP       | N/A         |

### Pedido
Este request não requer nenhuma configuração extra

#### Exemplo
URL:
```
http://localhost:3003/api/nodes
```

### Resposta
#### Body
A resposta deste pedido trás um array cujo formato é
| Nome              | Campo          |Mandatorio| Tipo de Dados | Descrição                                               |
|-------------------|----------------|----------|---------------|---------------------------------------------------------|
| id                | _id            |Sim       | string        | Identificador único gerado pela base de dados           |
| nome curto        | shortName      |Sim       | string        | Nome curto do nó de rede                                |
| nome              | name           |Sim       | string        | Nome do nó de rede                                      |
| longitude         | longitude      |Sim       | string        | Longitude do ponto                                      |
| latitude          | latitude       |Sim       | string        | Latitude do ponto                                       |
| ponto de recolha  | collectionNode |Sim       | boolean       | Identifica se o nó é um ponto de recolha de viaturas    |
| ponto de rendição | surrenderNode  |Sim       | boolean       | Identifica se o nó é um ponto de rendição de tripulações|
| versão            | __v            |Sim       | int           | Identificador único gerado pela base de dados           |

#### Exemplo

Body:
```json
[
    {
        "_id": "5fb1979b3d7ccb2fc820cac8",
        "shortName": "AGUIA",
        "name": "Aguiar de Sousa",
        "longitude": -8.4464785432391,
        "latitude": 41.1293363229325,
        "collectionNode": false,
        "surrenderNode": false,
        "__v": 0
    },
    {
        "_id": "5fb1979b3d7ccb2fc820cac9",
        "shortName": "BALTR",
        "name": "Baltar",
        "longitude": -8.38716802227697,
        "latitude": 41.1937898023744,
        "collectionNode": false,
        "surrenderNode": false,
        "__v": 0
    }
]
```

## [POST] /api/nodes
Breve descrição sobre a funcionalidade do endpoint
| Versão | Protocolo | Transporte | Autorização |
|--------|-----------|------------|-------------|
| 1.0    | REST      | HTTP       | N/A         |

### Pedido

#### Body
| Nome              | Campo          |Mandatorio| Tipo de Dados | Descrição                                               |
|-------------------|----------------|----------|---------------|---------------------------------------------------------|
| nome curto        | shortName      |Sim       | string        | Nome curto do nó de rede                                |
| nome              | name           |Sim       | string        | Nome do nó de rede                                      |
| longitude         | longitude      |Sim       | string        | Longitude do ponto                                      |
| latitude          | latitude       |Sim       | string        | Latitude do ponto                                       |
| ponto de recolha  | collectionNode |Sim       | boolean       | Identifica se o nó é um ponto de recolha de viaturas    |
| ponto de rendição | surrenderNode  |Sim       | boolean       | Identifica se o nó é um ponto de rendição de tripulações|

#### Exemplo
URL:
```
http://localhost:3003/api/nodes
```

Body:
```json
{
    "shortName": "AGUIA",
    "name": "Aguiar de Sousa",
    "longitude": -8.4464785432391,
    "latitude": 41.1293363229325,
    "collectionNode": false,
    "surrenderNode": false
}
```

### Resposta

#### Body
| Nome              | Campo          |Mandatorio| Tipo de Dados | Descrição                                               |
|-------------------|----------------|----------|---------------|---------------------------------------------------------|
| id                | id             |Sim       | string        | Identificador único gerado pela base de dados           |
| nome curto        | shortName      |Sim       | string        | Nome curto do nó de rede                                |
| nome              | name           |Sim       | string        | Nome do nó de rede                                      |
| longitude         | longitude      |Sim       | string        | Longitude do ponto                                      |
| latitude          | latitude       |Sim       | string        | Latitude do ponto                                       |
| ponto de recolha  | collectionNode |Sim       | boolean       | Identifica se o nó é um ponto de recolha de viaturas    |
| ponto de rendição | surrenderNode  |Sim       | boolean       | Identifica se o nó é um ponto de rendição de tripulações|

#### Exemplo

Body:
```json
{
    "id": "5fbd7cbe2930403b0009498f",
    "shortName": "node7",
    "name": "Valongo",
    "longitude": 17,
    "latitude": 56,
    "collectionNode": true,
    "surrenderNode": true
}
```

## [DELETE] /api/nodes/{nodeId}
Obtem um lista de todos os nós registados no sistema
| Versão | Protocolo | Transporte | Autorização |
|--------|-----------|------------|-------------|
| 1.0    | REST      | HTTP       | N/A         |

### Pedido
Este request não requer nenhuma configuração extra
#### URI Parameters
| Nome | Campo | Tipo de Dados | Descrição                                     |
|------|-------|---------------|-----------------------------------------------|
| id   | id    | string        | Identificador único gerado pela base de dados |

#### Exemplo
URL:
```
http://localhost:3003/api/nodes/5fbd7cbe2930403b0009498f
```

### Resposta
É apenas retornado um código 204