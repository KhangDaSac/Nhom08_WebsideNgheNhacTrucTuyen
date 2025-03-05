import { useState } from 'react'
import { Flowbite } from "flowbite-react";
import './App.css'
import NavbarComponent from './components/navbar/NavbarComponent'
import FooterComponent from './components/footer/FooterComponent'
import PlaylistCollection from './components/collections/playlist-collection/PlaylistCollection';

function App() {
  const user = {
    user_name: "Đào Phúc Khang",
    email: "daophuckhang090@gmail.com"
  }

  const playlistCollectionRecommend = [
    {tittle: "Thiên hạ nghe gì?"},
    {},
    {},
    {},
    {},
    {},
    {},
    {}
  ]

  return (
    <>
      <Flowbite>
        <NavbarComponent user={user}></NavbarComponent>
        <div>
          <PlaylistCollection items = {playlistCollectionRecommend}></PlaylistCollection>
        </div>
        <FooterComponent></FooterComponent>
      </Flowbite>

    </>
  )
}

export default App
