import { Avatar, Image, Popover } from 'antd'
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login,logout, selectUser } from '../../features/userSlice';
import "./css/LandingHeader.css"
import { auth } from '../../firebase';
import { selectCurrentToken } from '../../features/authSlice';
import { logOut } from '../../features/authSlice';
import { selectUserId } from '../../features/userIdSlice';
import getUserInfoById from "../getUserInfo"
import { selectUser_id } from '../../features/authSlice';
import axios from 'axios';



const LandingHeader = ({onSave}) => {

    const [visible, setvisible] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const token = useSelector(selectCurrentToken)
    const [userInfo, setUserInfo] = useState();
    const userId = useSelector(selectUserId); // user logged in with google
    const user_id = useSelector(selectUser_id); // user logged in with jwt
    const [userData, setUserData]= useState();
    const [loading, setLoading] = useState(false);  

    const [searchItem, setSearchItem] = useState('');
    const [error, setError] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([])
    const [apiUsers, setApiUsers] = useState([])
    const [open, setOpen] = useState(false);
    const popoverRef = useRef(null);


    const handleClickOutside = (event) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target)) {
          setOpen(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);



    const handleInputChange = (e) =>{
        const searchItem = e.target.value;
        setSearchItem(searchItem);

        if (searchItem == '')
        {
            setFilteredUsers([]);
        }else {
            const filteredItems = apiUsers.filter((user)=>
                user.name.toLowerCase().includes(searchItem.toLocaleLowerCase()));
            setFilteredUsers(filteredItems)
        }
    }

   

    const togglePopover = ()=>{
        setOpen(true)
    }

    useEffect(()=>{
        console.log('the user id: '+ userId)
    },[])
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const user = await getUserInfoById(userId || user_id);
                console.log('User Data:', user);
                setUserData(user);
                onSave();
            } catch (error) {
                // Handle the error if needed
            } finally {
                setLoading(false);
            }
           
        };
    
        fetchData();
        
    }, [userId || user_id]);
    
      
    useEffect(()=>{
        console.log("the access token : "+ token)
        fetchUsers();
    },[])


    const fetchUsers = async () =>{       
        try{
            const response = await axios.get('http://localhost:8080/api/v1/user/allUsers');
            const users = response.data;
            setApiUsers(users)
            setFilteredUsers(users)
            setLoading(false)
            console.log('users :' + users)
            console.log('filteredUsers: ' + filteredUsers)
            console.log('api users : ' + apiUsers)
        }   
        catch(err){
            console.log(err);
            setError(err)
        }
        
    }



    const Content = () =>{
        return (
            <div className='pop-content'>
                <div className='pop-content-container'>
                
                <div className='profile'>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/>
                </svg>
                <span><Link to={`/profile`}>Profile </Link></span>
                </div>

                {/* <div className='library'>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>                    
                <span><Link to={"/lists"}>Library</Link>
                    </span>
                </div>

                <div className='stories'>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5V78.6c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8V454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5V83.8c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11V456c0 11.4 11.7 19.3 22.4 15.5z"/></svg>
                    <span><Link to={"/stories"}>Stories</Link>
                    </span>
                </div> */}

                <div className='stats'>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M576 0c17.7 0 32 14.3 32 32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V32c0-17.7 14.3-32 32-32zM448 96c17.7 0 32 14.3 32 32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V128c0-17.7 14.3-32 32-32zM352 224V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V224c0-17.7 14.3-32 32-32s32 14.3 32 32zM192 288c17.7 0 32 14.3 32 32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V320c0-17.7 14.3-32 32-32zM96 416v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V416c0-17.7 14.3-32 32-32s32 14.3 32 32z"/></svg>
                <span>
                    <Link to={"/me/stats"}>Stats</Link>
                </span>
                </div>

                <div className='becomeMemeber'>
                    <span>
                        <Link to={"/membership"}>Become a member</Link>
                    </span>
                </div>

                <div className='settings'>
                    <span>
                        <Link to={"/me/settings"}>
                        Settings
                        </Link>
                        
                    </span>
                </div>
                
                <div className='signout'>
                    <span onClick={()=>{
                        if (user){
                            auth.signOut().then(()=>{
                                dispatch(logout());
                                /*navigate("getting-started",{
                                    replace:true,
                                })*/ //kendisi bilir nereye gidecegine
                            })
                            localStorage.setItem("isLoggedIn",false);
                            localStorage.removeItem('authUser');
                        }
                        else {
                            dispatch(logOut());
                        }
                                             
                        //delete axios.defaults.headers.common['Authorization'];
                    }}
                    >
                        Sign Out
                    </span>
                    </div>
                </div>
            </div>
        )
    }

  return (
    <header>
        <div className='landingHeader'>
            <div className='header-left'>
            <div className='header-left-option'>
                <Link to="/">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
                <path d="M15 12A13 13 0 1015 38 13 13 0 1015 12zM35.5 13c-3.59 0-6.5 5.373-6.5 12 0 1.243.102 2.441.292 3.568.253 1.503.662 2.879 1.192 4.065.265.593.56 1.138.881 1.627.642.978 1.388 1.733 2.202 2.201C34.178 36.811 34.827 37 35.5 37s1.322-.189 1.933-.539c.814-.468 1.56-1.223 2.202-2.201.321-.489.616-1.034.881-1.627.53-1.185.939-2.562 1.192-4.065C41.898 27.441 42 26.243 42 25 42 18.373 39.09 13 35.5 13zM45.5 14c-.259 0-.509.173-.743.495-.157.214-.307.494-.448.833-.071.169-.14.353-.206.551-.133.395-.257.846-.37 1.343-.226.995-.409 2.181-.536 3.497-.063.658-.112 1.349-.146 2.065C43.017 23.499 43 24.241 43 25s.017 1.501.051 2.217c.033.716.082 1.407.146 2.065.127 1.316.31 2.501.536 3.497.113.498.237.948.37 1.343.066.198.135.382.206.551.142.339.292.619.448.833C44.991 35.827 45.241 36 45.5 36c1.381 0 2.5-4.925 2.5-11S46.881 14 45.5 14z"></path>
                </svg>
                </Link>
            </div>
        <div className='header-left-option'>

            <input className='input-header-left' 
            placeholder='Search'type='search'
            value={searchItem}
            onChange={handleInputChange}
            onClick={togglePopover} 
            style={{cursor:'pointer'}}
            > 
            </input> 

            {open && (
        <div className="searchBoxHeader" ref={popoverRef}>
        {loading && <p>Loading...</p>}
        {error && <p>There was an error loading the users</p>}
        {searchItem.length === 0 ? (
            <p style={{fontSize:'20px'}}>Who are you looking for?</p>
        ) : (
            filteredUsers.map(user => (
                <div className='searchBoxUserInfo'
                key={user.id}>
                <img src={user.photoURL} />
                <Link to = {`/${user.username}`}>
                <span>{user.name}</span>
                </Link>
                </div>
            ))
        )}
    </div>
)}

        </div>

            </div>
            <div className='header-right'>
                <div className='header-right-options'>
                    <div className='header-right-option' id='write_id'>
                    <Link to={"/new-story"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
                    </svg></Link>
                    Write
                    </div>
                    <div className='header-right-option'>
                    <span>
                        <svg width="30" height="30" viewBox="-293 409 25 25" class="la">
                        <path d="M-273.33 423.67l-1.67-1.52v-3.65a5.5 5.5 0 0 0-6.04-5.47 5.66 5.66 0 0 0-4.96 5.71v3.41l-1.68 1.55a1 1 0 0 0-.32.74V427a1 1 0 0 0 1 1h3.49a3.08 3.08 0 0 0 3.01 2.45 3.08 3.08 0 0 0 3.01-2.45h3.49a1 1 0 0 0 1-1v-2.59a1 1 0 0 0-.33-.74zm-7.17 5.63c-.84 0-1.55-.55-1.81-1.3h3.62a1.92 1.92 0 0 1-1.81 1.3zm6.35-2.45h-12.7v-2.35l1.63-1.5c.24-.22.37-.53.37-.85v-3.41a4.51 4.51 0 0 1 3.92-4.57 4.35 4.35 0 0 1 4.78 4.33v3.65c0 .32.14.63.38.85l1.62 1.48v2.37z"></path>
                        </svg>
                    </span>
                    </div>
                    
                    <div className='header-right-avatar'>
                    <span>
                        <div className="header-right-avatar-icon">
                        <span>
                        <Popover
                            content={<Content/>}
                            //title={<Title/>}
                            trigger= "click"
                            visible={visible}
                            placement="bottom"
                             onVisibleChange={() => setvisible(!visible)}
                            >
                                <Avatar
                                    size={40}
                                    style={{cursor:"pointer",}}
                                    src={
                                        <Image
                                          preview={false}
                                          src={userData?.photoURL ?? 'https://img.icons8.com/material-outlined/24/user--v1.png'}
                                        />
                                      }
                                />  
                        </Popover>
                        </span>
                    </div>
                    </span>
                </div>
            </div>
            </div>                            
        </div>
    </header>
  )
}

export default LandingHeader;