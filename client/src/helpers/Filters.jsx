import React from 'react'
import {
    fetchPokemons,
    filterPokemons
} from "../redux/actions/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import TypeIcon from '../components/TypeIcon/TypeIcon';
import './Filters.css'
import SearchBar from '../components/SearchBar';

export default function Filters() {
    const allTypes = useSelector((state) => state.types);
    const dispatch = useDispatch();
    const [filter, setFilter] = useState({
        typeFilter: "default",
        order: 'default'
    });

    function handleClick(e) {
        setFilter({
            typeFilter: "default",
            order: 'default'
        })
        dispatch(fetchPokemons());
    }

    function handleFilters(event) {

        switch (event.target?.value) {
            case 'nameUp': {
                setFilter({
                    ...filter,
                    order: 'nameUp'
                })
                break;
            };
            case 'nameDown': {
                setFilter({
                    ...filter,
                    order: "nameDown"
                })
                break;
            };
            case 'attackUp': {
                setFilter({
                    ...filter,
                    order: "attackUp"
                })
                break;
            };
            case 'attackDown': {
                setFilter({
                    ...filter,
                    order: "attackDown"
                })
                break;
            };
            default: {
                setFilter({
                    ...filter,
                    typeFilter: event.target.value
                })
                break;
            }
        }
    }
    useEffect(() => {
        if (Object.values(filter).find(e => e !== "default")) dispatch(filterPokemons(filter));
    }, [filter])



    return (
        <div className="filters">
            <div className='type-container' >
                {allTypes.map((type) => {
                    return (
                        <TypeIcon key={type.id} name={type.name} handleFilters={handleFilters} />
                    )
                })}
            </div>
            <div className='order-container'>
                <div className='selector'>
                    <select onChange={(e) => handleFilters(e)} name="Order">
                        <option value="Any" hidden={true}>Order by</option>
                        <option value="nameUp">Order A-Z</option>
                        <option value="nameDown">Order Z-A</option>
                        <option value="attackUp">Attack +</option>
                        <option value="attackDown">Attack -</option>
                    </select>
                </div>
                <div className="reload-container">
                    <button
                        className="realodButton"
                        onClick={(e) => {
                            handleClick(e);
                        }}
                    >
                        Reload Pokemons
                    </button>
                </div>
                <SearchBar />
            </div>
        </div>
    )
}

