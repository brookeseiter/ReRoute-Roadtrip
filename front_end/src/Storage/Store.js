const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token : null,
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
                    const response = await fetch('/login', requestOptions)   
                    if (response.status !== 200){
                        alert("There has been an error");
                        return false;
                    } 
                 
                    const data = await response.json();
                    console.log("this came from the backend", data);
                    sessionStorage.setItem("token", data.access_token);
                    setStore({ token: data.access_token });
                    return true;  
                }
                catch(error){
					console.error("There was a login error")
				}
            },
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch(error){
					console.log("Error loading message from backend", error)
				}
			},
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