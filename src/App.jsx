import './App.css';
import {Container} from '@mui/material';
import {Searcher} from './components/Searcher';
import {useEffect, useState} from 'react';
import {getGitHubUser} from './services/users.js';
import {UserCard} from './containers/userCard/index.jsx';


function App() {
	
	const [inputUser, setInputUser] = useState('octocat');
	const [userState, setUserState] = useState('userState');
	const [notFound, setNotFound] = useState(false);
	const gettingUser = async (user) => {
		const userResponse = await getGitHubUser(user);
		
		if (userState === 'octocat') {
			localStorage.setItem('octocat', userResponse);
		}
		
		if (userResponse.message === 'Not Found') {
			const {octocat} = localStorage.getItem('octocat');
			setInputUser(octocat);
			setNotFound(true);
		} else {
			setUserState(userResponse);
		}
		
		console.log(userResponse);
	};
	
	useEffect(() => {
		gettingUser(inputUser);
	}, [inputUser]);
	
	return (
		<Container sx={{
			background: 'whitesmoke',
			width: '80vw',
			height: '500px',
			borderRadius: '16px',
			marginTop: '40px',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center'
		}}>
			<Searcher inputUser={inputUser} setInputUser={setInputUser}/>
			<UserCard userState={userState}/>
		</Container>
	);
}

export default App;
