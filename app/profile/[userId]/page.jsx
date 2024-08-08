"use client"

import {useState, useEffect} from 'react';

import Profile from '@components/Profile';

const UserProfile = ({params}) => {

   const [posts, setPosts] = useState([]);
   const [userProfile, setUserProfile] = useState([]);
   useEffect(() => {
      const fetchPosts = async () => {
        const response = await fetch(`/api/users/${params?.userId}/posts`);
        const data = await response.json();
  
        setPosts(data);
      }

      const fetchUser = async () => {
         const response = await fetch(`/api/users/${params?.userId}`);
         const data = await response.json();

         setUserProfile(data);
      }
  
      if(params?.userId){
         fetchPosts();
         fetchUser();
      }
    },[])

  return (
   <Profile
      name={userProfile?.username}
      desc={`Welcome to ${userProfile?.username} profile page.`}
      data={posts}
      />
  )
}

export default UserProfile;