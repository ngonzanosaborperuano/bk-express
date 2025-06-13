// import Chat from '../domain/chat.js';

// class ChatService {
//     constructor(pdfRepository, langChainService) {
//         this.pdfRepository = pdfRepository;
//         this.langChainService = langChainService;
//         this.chats = new Map(); // pdfId -> Chat
//     }
//     async uploadPDF(buffer, pdfId) {
//         const path = await this.pdfRepository.save(buffer, pdfId);
//         const docs = await this.pdfRepository.loadContent(path);
//         await this.langChainService.createChain(pdfId, docs);
//         const chat = new Chat({ id: pdfId, content: docs });
//         this.chats.set(pdfId, chat);
//         return chat;
//     }
//     async ask(pdfId, question) {
//         const chain = this.langChainService.getChain(pdfId);
//         if (!chain) throw new Error('PDF no cargado');
//         const chat = this.chats.get(pdfId);
//         const response = await chain.call({
//             question,
//             chat_history: chat.history,
//         });
//         chat.addToHistory(question, response.text);
//         return response.text;
//     }
// }
// export default ChatService; 