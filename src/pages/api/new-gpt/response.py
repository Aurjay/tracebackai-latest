import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.llms import OpenAI
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/api/new-gpt/response.py', methods=['POST'])
def my_endpoint():
    try:
        # Get the question from the request body
        question = request.json['question']

        # Get the OpenAI API key from environment variable
        openai_api_key = os.getenv('OPENAI_API_KEY')

        if not openai_api_key:
            return jsonify({'error': 'OpenAI API key not found.'}), 500

        # Determine the file path based on the deployment environment
        file_path = os.path.join(app.root_path, 'EU-AI-ACT-2.txt')
        print(file_path)

        # Load the text documents
        loader = TextLoader(file_path, encoding='utf8')
        documents = loader.load()

        # Split the documents into chunks
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=2500, chunk_overlap=0)
        texts = text_splitter.split_documents(documents)

        # Create the embeddings and Chroma index
        embeddings = OpenAIEmbeddings()
        docsearch = Chroma.from_documents(texts, embeddings)

        # Set up the prompt template
        prompt_template = """Use the following pieces of context to answer the question at the end. Try to find the answer from the document as much as possible and if it is not use the answer from OpenAI API. Answer in a manner such that it relates to different articles of the EU-AI-ACT and try to refer to the article number as much as possible. End with suggestions of next possible steps and suggest potential questions to ask further.

        {context}

        Question: {question}"""
        PROMPT = PromptTemplate(template=prompt_template, input_variables=["context", "question"])

        # Set up the RetrievalQA chain
        chain_type_kwargs = {"prompt": PROMPT}
        qa = RetrievalQA.from_chain_type(llm=OpenAI(), chain_type="stuff", retriever=docsearch.as_retriever(), chain_type_kwargs=chain_type_kwargs)

        # Run the query
        answer = qa.run(question)

        response = jsonify({'answer': answer})
        response.headers.add('Access-Control-Allow-Origin', '*')

        return response
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run()
