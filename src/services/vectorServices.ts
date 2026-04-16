import { chunkText } from "../utils/chunker";
import { createEmbedding } from "../utils/embeddings";
import { vectorStore } from "../store/vectorStore";
import { v4 as uuidv4 } from "uuid";
import { cosineSimilarity } from "../utils/similarity";

//save resume to vector store
export const storeEmbedding = async (resumeText: string, userId: string) => {
  const chunks = chunkText(resumeText, 500);
  for (const chunk of chunks) {
    const embedding = await createEmbedding(chunk);

    vectorStore.push({
      id: uuidv4(),
      userId,
      text: chunk,
      embedding,
    });
  }
};

//retrieve relevant chunks
export const getRelevantChunks = async (query: string, userId: string) => {
  const queryEmbedding = await createEmbedding(query);
  const userVectors = vectorStore.filter((item) => item.userId === userId);
  const scored = userVectors.map((item) => ({
    text: item.text,
    score: cosineSimilarity(queryEmbedding, item.embedding),
  }));
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.text);
};
