export enum LLMsList {
    GPT3 = 'GPT-3',
    GPT4 = 'GPT-4',
    BERT = 'BERT',
    T5 = 'T5',
    ROBERTA = 'RoBERTa',
    XLNET = 'XLNet'
}

export const LLMsDescription = {
    [LLMsList.GPT3]: {
        image: '/gpt3.png',
        description: 'GPT-3 is a large language model developed by OpenAI. It is a transformer-based model that uses a self-attention mechanism to process text data.',
    },  
    [LLMsList.GPT4]: {
        image: '/gpt4.png',
        description: 'GPT-4 is a large language model developed by OpenAI. It is a transformer-based model that uses a self-attention mechanism to process text data.',
    },
    [LLMsList.BERT]: {
        image: '/bert.png',
        description: 'BERT is a large language model developed by Google. It is a transformer-based model that uses a self-attention mechanism to process text data.',
    },
    [LLMsList.T5]: {
        image: '/t5.png',
        description: 'T5 is a large language model developed by Google. It is a transformer-based model that uses a self-attention mechanism to process text data.',
    },
    [LLMsList.ROBERTA]: {
        image: '/roberta.png',
        description: 'RoBERTa is a large language model developed by Facebook. It is a transformer-based model that uses a self-attention mechanism to process text data.',
    },
    [LLMsList.XLNET]: {
        image: '/xlnet.png',
        description: 'XLNet is a large language model developed by Google. It is a transformer-based model that uses a self-attention mechanism to process text data.',
    },
} as const satisfies Record<LLMsList, { image: string; description: string }>

export const LocalLLmKey = 'local_llm'