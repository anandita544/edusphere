import React, { useState } from "react";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { genAIkey } from "../data/apikey";
import { IoIosSend } from "react-icons/io";

const Chatbot = () => {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const genAI = new GoogleGenerativeAI(genAIkey);
	console.log(genAI);

	const sendMessage = async (msg) => {
		// console.log(messages);
		const userMessage = { role: "user", text: msg };
		setMessages((prevMessages) => [...prevMessages, userMessage]);

		try {
			const model = genAI.getGenerativeModel({ model: "gemini-pro" });
			const chat = model.startChat({
				history: [],
			});
			const info =
				"you are a chatbot connected to a edtech platflom edusphere. answer to this query: ";
			msg = info + msg;
			const result = await chat.sendMessage(msg);
			const response = await result.response;
			const reply = response.text();
			const botMessage = { role: "bot", text: reply };
			setMessages((prevMessages) => [...prevMessages, botMessage]);
		} catch (error) {
			console.error("Error sending message:", error);
			const botMessage = {
				role: "bot",
				text: "Sorry unable to understand your text",
			};
			setMessages((prevMessages) => [...prevMessages, botMessage]);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (input.trim()) {
			sendMessage(input);
			setInput("");
		}
	};

	return (
		<div className='flex flex-col h-96 w-auto bg-white rounded-lg shadow-lg animate-slideUp'>
			<div className='flex-1 p-4 overflow-y-auto'>
				{messages.map((msg, index) => (
					<div
						key={index}
						className={`my-2 p-3 max-w-60 min-w-fit rounded-lg ${
							msg.role === "user"
								? "bg-blue-500 text-white self-end ml-auto"
								: "bg-pure-greys-25 self-start"
						}`}>
						{msg.text}
					</div>
				))}
			</div>
			<form
				onSubmit={handleSubmit}
				className='flex p-4'>
				<input
					type='text'
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder='Type a message...'
					className='flex-1 p-2 bg-pure-greys-25 rounded-md focus:outline-none focus:ring focus:border-blue-300'
				/>
				<button
					type='submit'
					className='ml-2 p-2 rounded-md'>
					<IoIosSend className='size-5 text-blue-500' />
				</button>
			</form>
		</div>
	);
};

export default Chatbot;