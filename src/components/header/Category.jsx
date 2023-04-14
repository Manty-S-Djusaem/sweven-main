import React from 'react';
import Header from './Header';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { database } from '../../app/firebase';
import { Card } from 'react-bootstrap';
import { CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Category = (props) => {

    const id = useParams()
    const [products, setProducts] = useState([])

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        const q = query(collection(database, "product"), where("idCategory", "==", id.category));
        const allProducts = await getDocs(q)
        let products = []
        allProducts.forEach(product => {
            products.push(product.data())
        })
        setProducts(products)
        console.log(products)
    }

    const viewProducts = products.map((product, index) => {
        return (
            <Card text="123123" key={index}>
                <Card.Img variant="top" src={product.photo} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                    {product.description}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">{product.price}$</small>
                </Card.Footer>
        </Card> 
            // <div>

            // </div>
        )
    })
    
    return (
        <div>
            <div className="container">
                Страница категории
                <CardGroup>
                    {viewProducts}
                </CardGroup>
            </div>
        </div>
    );
}

export default Category;