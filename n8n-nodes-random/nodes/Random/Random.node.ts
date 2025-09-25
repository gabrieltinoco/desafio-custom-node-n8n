// n8n-nodes-random/nodes/Random/Random.node.ts

import {
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    IExecuteFunctions
} from 'n8n-workflow';

export class Random implements INodeType {
    description: INodeTypeDescription = {
        
        displayName: 'Random Number',
        name: 'random',
        
        icon: 'file:random.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"]}}',
        description: 'Gera um número aleatório utilizando a API do Random.org',
        defaults: {
            name: 'Random Number',
        },
        inputs: ['main'],
        outputs: ['main'],

        properties: [
            
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'True Random Number Generator',
                        value: 'generate',
                        description: 'Gera um número inteiro aleatório',
                        action: 'Gera um número inteiro aleatório',
                    },
                ],
                default: 'generate',
            },

            // Definição dos campos de input (Min e Max)
            {
                displayName: 'Min',
                name: 'min',
                type: 'number',
                default: 1,
                required: true,
                description: 'O menor valor inteiro a ser retornado (incluso)',
                displayOptions: {
                    show: {
                        operation: ['generate'],
                    },
                },
            },
            {
                displayName: 'Max',
                name: 'max',
                type: 'number',
                default: 100,
                required: true,
                description: 'O maior valor inteiro a ser retornado (incluso)',
                displayOptions: {
                    show: {
                        operation: ['generate'],
                    },
                },
            },
        ],
    };

    
async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        
        const min = this.getNodeParameter('min', 0) as number;
        const max = this.getNodeParameter('max', 0) as number;

        
        const apiUrl = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

        
        const response = await this.helpers.httpRequest({
            method: 'GET',
            url: apiUrl,
            
            json: false,
        });

        
        const randomNumber = parseInt(response.toString().trim(), 10);

        
        const returnData = this.helpers.returnJsonArray([{ result: randomNumber }]);

        return [returnData];
    }
}