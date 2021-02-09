import React from 'react';
import MessageForm from './MessageForm';
import TheirMessage from './TheirMessage';
import MyMessage from './MyMessage';
const ChatFeed = (props) =>{
	const {chats, activeChat, userName, messages} = props;
	//console.log(chats)
	//chats[activaChat] gives the current room with its id, messages, owner and other props
	//activeChat gives the id of current chat group
	const chat = chats && chats[activeChat];
	//console.log(chat)



	//generating messages
	const renderMessages = ()=>{
		const keys = Object.keys(messages)
		//messages in object with keys of message id, message, sender and its values
		console.log(messages)
		//keys are the each key id of eavch message.since each message has a key/id
		console.log(keys)
		return keys.map((key, index)=>{
				const message = messages[key];
				//finding last message
				const lastMessageKey = index===0 ? null : keys[index-1];
				const isMyMessage = userName ===message.sender.username;

				return(
					<div key={`msg_${index}`}  style={{ width: '100%' }}>
			          <div className="message-block">
			            {isMyMessage
			              ? <MyMessage message={message} />
			              : <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />}
			          </div>
			          <div className="read-receipts">
			          	style={{ marginRight: isMyMessage ? '18px' : '0px',
			          	marginLeft: isMyMessage ? '0px' : '68px' }}>
			          	read-receipts
			          </div>
					</div>
				)

		})
	}
	
	if (!chat) return <div />;
	return(
		<div className="chat-feed">
		  <div className="chat-title-container">
		    <div className="chat-title">{chat?.title}</div>
		    	<div className="chat-subtitle">
		    	{chat.people.map((person) => ` ${person.person.username}`)}
		    	</div>
		  </div>
		  {renderMessages()}
		  <div style={{ height: '100px' }} />
		  <div className="message-form-container">
		  	<MessageForm {...props} chatId={activeChat} />
		  </div>
		</div>
	)
}

export default ChatFeed;