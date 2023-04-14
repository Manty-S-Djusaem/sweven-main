import React from 'react';
import module from './Catalogue.module.scss'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup';
import { collection, query, getDocs } from 'firebase/firestore';
import { database } from '../../app/firebase';

import ruchka from '../assets/ruchka.png'
import igla from '../assets/igla.png'
import nitki from '../assets/nitki.png'
import palletka from '../assets/palletka.png'
import glina from '../assets/glina.png'
import img from '../assets/img_card.png'

const Catalogue = (props) => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getData();
  }, [])

  console.log(categories)

  async function getData() {
    const q = query(collection(database, "category"));
    const querySnapshot = await getDocs(q);
    let category = []
    querySnapshot.forEach((doc) => {
      category.push({ ...doc.data(), id: doc.id })
      console.log(doc.id)
    });
    setCategories(category)
  }

  const showAllCategory = categories.map((category, index) => {
    return (
      <Link to={`/category/${category.id}`}>
        <Card text="123123" key={index}>
          <Card.Img variant="top" src={category?.img} />
          <Card.Body>
            <Card.Title>{category.name}</Card.Title>
          </Card.Body>
        </Card>
      </Link>
    )
  })

  return (
    <div className={module.container}>
      {/*showAllProducts*/}
      <CardGroup>
        {showAllCategory}
      </CardGroup>
    </div >
  )
}

export default Catalogue;