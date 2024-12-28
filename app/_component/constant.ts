export enum LLMsList {
    GPT3 = 'GPT-3',
    GPT4 = 'GPT-4',
    BERT = 'BERT',
    T5 = 'T5',
    ROBERTA = 'RoBERTa',
    XLNET = 'XLNet',
    GEMINI = 'Gemini',
    CHATGPT = 'ChatGPT',
    PI = 'Pi',
    CLAUDE = 'Claude'
}

export const LLMsDescription = {
    [LLMsList.GPT3]: {
        image: '/gpt3.png',
        title: 'GPT-3',
        heading: 'Overview of GPT-3',
        content: 'GPT-3 is a large language model by OpenAI with 175 billion parameters, known for advanced text processing and generation capabilities.',
        footer: 'Select GPT-3',
    },
    [LLMsList.GPT4]: {
        image: '/gpt4.png',
        title: 'GPT-4',
        heading: 'Overview of GPT-4',
        content: 'GPT-4, OpenAI\'s latest model, improves on GPT-3 with enhanced language understanding and reasoning abilities for complex tasks.',
        footer: 'Select GPT-4',
    },
    [LLMsList.BERT]: {
        image: '/bert.png',
        title: 'BERT',
        heading: 'Overview of BERT',
        content: 'BERT uses bidirectional training for improved context understanding, excelling in tasks like question answering and sentence prediction.',
        footer: 'Select BERT',
    },
    [LLMsList.T5]: {
        image: '/t5.png',
        title: 'T5',
        heading: 'Overview of T5',
        content: 'T5 treats all NLP tasks as text-to-text problems, allowing for versatile applications in translation, summarization, and more.',
        footer: 'Select T5',
    },
    [LLMsList.ROBERTA]: {
        image: '/roberta.png',
        title: 'RoBERTa',
        heading: 'Overview of RoBERTa',
        content: 'RoBERTa enhances BERT\'s performance through optimized training with larger datasets and extended training periods.',
        footer: 'Select RoBERTa',
    },
    [LLMsList.XLNET]: {
        image: '/xlnet.png',
        title: 'XLNet',
        heading: 'Overview of XLNet',
        content: 'XLNet combines autoregressive and autoencoding approaches, using permutation-based training to capture bidirectional context effectively.',
        footer: 'Select XLNet',
    },
    [LLMsList.GEMINI]: {
        image: '/gemini.png',
        title: 'Gemini',
        heading: 'Overview of Gemini',
        content: 'Gemini specializes in real-time conversational AI, focusing on interactive applications with advanced dialogue management.',
        footer: 'Select Gemini',
    },
    [LLMsList.CHATGPT]: {
        image: '/chatgpt.png',
        title: 'ChatGPT',
        heading: 'Overview of ChatGPT',
        content: 'ChatGPT is a conversational AI model designed for human-like responses in chat interfaces, ideal for various interactive applications.',
        footer: 'Select ChatGPT',
    },
    [LLMsList.PI]: {
        image: '/pi.png',
        title: 'Pi',
        heading: 'Overview of Pi',
        content: 'Pi is an AI model for precise, domain-specific tasks, excelling in areas like medical diagnosis and financial analysis.',
        footer: 'Select Pi',
    },
    [LLMsList.CLAUDE]: {
        image: '/claude.png',
        title: 'Claude AI',
        heading: 'Overview of Claude AI',
        content: 'Claude AI is a versatile model supporting both general and specialized tasks, from casual conversation to complex problem-solving.',
        footer: 'Select Claude',
    },
} as const satisfies Record<LLMsList, { image: string; title: string; heading: string; content: string; footer: string }>;


export const LocalLLmKey = 'local_llm'

export const LastChatKey = 'last_chat'

export enum LeftSideItems {
    GPTs = 'GPTs',
    ADD_CHAT = 'Chats',
    SELECTED_CHAT_ID = 'chat_id_'
}