"use client"

import {useState, useEffect} from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map(post => {
        return (
        <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        />)
      })}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [allPosts, setAllPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)
    if(!searchText){
      fetchPosts();
    }
    else{
      setSearchTimeout(() => {
        setTimeout(() => {
          filterPrompts(e.target.value);
        }, 2000)
      });
    }
  }

  const handleTagClick = (tag) => {
    setSearchText(tag);
    filterPrompts(tag);
  }

  const filterPrompts = (keyword) => {
    const pattern = new RegExp(keyword, "i");
    setFilteredPosts(() => allPosts.filter((post) => pattern.test(post.prompt) || pattern.test(post.tag) || pattern.test(post.creator.username)))
  }

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setAllPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  },[])

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input 
        type="text" 
        placeholder='Search for a tag or username'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input peer' />
      </form>

      <PromptCardList
        data={searchText ? filteredPosts : allPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed