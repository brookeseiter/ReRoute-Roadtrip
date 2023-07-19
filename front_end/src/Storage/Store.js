const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			token : null,
			user_id : null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			// syncTokenFromSessionStore: () => {
			// 	const token = sessionStorage.getItem("token");
			// 	if (token && token !== "" && token !== undefined) setStore({ token: null });
			// },
			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Logging out");
				setStore({ token: null });
			},
            login: async (inputs) => {
            	const body = {
                    email: inputs.email,
                    password: inputs.password,
                };  

                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(body)
                };
        
                try{
                    const response = await fetch('/login', requestOptions);  
					console.log('response:', response); 
					console.log('response status:', response.status); 
                    if (response.status !== 200){
                        alert("The username or password entered is incorrect, please try again.");
						console.log(response);
                        return false;
                    }
                 
                    const data = await response.json();
                    console.log("this came from the backend", data);
                    sessionStorage.setItem("token", data.access_token);
					sessionStorage.setItem("user_id", data.user_id);
                    setStore({ token: data.access_token, user_id: data.user_id });
                    return true;  
                }
                catch(error){
					console.error("There was a login error")
				}
            },
			// getMessage: () => {
			// 	const store = getStore();
			// 	const opts = {
			// 		headers : {
			// 			"Authorization": "Bearer" + store.token
			// 		}
			// 	};
			// 	fetch("https://localhost:3000/hello", opts)
			// 		.then(response => response.json())
			// 		.then(data => setStore({ message: data.message }))
			// 		.catch(error => console.log("Error loading message from backend", error));	
			// },
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;

// source: https://www.youtube.com/watch?v=8-W2O_R95Pk
// store initializes token and actions fetches and gets response,
// token gets put into session storage and into store, where it 
// automatically rerenders entire login