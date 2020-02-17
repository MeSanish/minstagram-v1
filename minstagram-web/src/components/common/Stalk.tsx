import React, { useState, useEffect, useRef } from 'react';

import axiosInstance from 'src/utils/axios';
import styled from 'styled-components';
import { history } from '../Router';

interface IUser {
  id: string;
  email: string;
  profileUrl: string;
}


const UserList = styled.ul`
  position: absolute;
  box-shadow: 1px 1px 10px rgba(0,0,0,0.2);
  margin: 0;
  padding: 0;
  background: white;
`
const UserListItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 2fr;
  cursor: pointer;
`

const UserProfileImage = styled.img`
  margin: 16px;
  max-width: 44px;
  border-radius: 22px;
`

const EmailWrapper = styled.span`
  margin: 16px auto;
  padding: 10px 0;
`

const Stalk: React.SFC<{}> = () => {
  const initialMount = useRef(true);
  const wrapperRef = useRef<HTMLDivElement |  null>(null);
  const [isListVisible, setIsListVisible] = useState(false);
  const [userList, setUserList] = useState<Array<IUser>>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
  }

  const fetchUserList = async () => {
    try {
      const userList: Array<IUser> = await axiosInstance.get('/v1/users', {
        params: {
          search: searchTerm
        }
      })
        .then(({ data }) => data)
        .catch((error) => {
          throw error;
        })
      setUserList(userList)
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    if (!initialMount.current) {
      fetchUserList();
    }
  }, [searchTerm]);

  const handleOutsideClick = (event: MouseEvent) => {
    if(wrapperRef.current) {
      if(!wrapperRef.current.contains(event.target as Node)) {
        setIsListVisible(false)
      }
    }
  }

  useEffect(() => {
    if (initialMount.current) {
      document.addEventListener("click", handleOutsideClick)
      initialMount.current = false;
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    } 
  }, [])

  const handleFocus = () => {
    setIsListVisible(true);
  }

  const handleUserSelection = (id: string) => (event: React.MouseEvent<HTMLLIElement>) => {
    history.push(`/users/${id}`);
    setIsListVisible(false);
  }

  return (
    <div ref={wrapperRef}>
      <input className="search" placeholder="Want to stalk" value={searchTerm} onChange={handleSearchTermChange} onFocus={handleFocus} />
      <UserList>
        {isListVisible ? <>
        {userList.map(({ email, profileUrl, id }) => (
          <UserListItem key={id} onClick={handleUserSelection(id)}>
            <UserProfileImage src={profileUrl} />
            <EmailWrapper>{email}</EmailWrapper>
          </UserListItem>
        ))}
        </> : null}
      </UserList>
    </div>
  );
};

export default Stalk;