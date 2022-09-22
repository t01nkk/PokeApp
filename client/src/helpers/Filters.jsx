import React from 'react'
import {
    fetchPokemons,
    filterPokemons
} from "../redux/actions/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import TypeIcon from '../components/TypeIcon/TypeIcon';
import '../styles/App.scss'
import SearchBar from '../components/SearchBar/SearchBar';

export default function Filters() {
    const allTypes = useSelector((state) => state.types);
    const dispatch = useDispatch();
    const [filter, setFilter] = useState({
        typeFilter: "default",
        order: 'default',
        direction: 'ASC'
    });

    function handleClick(e) {
        setFilter({
            typeFilter: "default",
            order: 'default',
            direction: 'ASC'
        })
        dispatch(fetchPokemons());
    }

    function handleFilters(event) {
        switch (event.target?.value) {
            case 'name': {
                setFilter({
                    ...filter,
                    order: 'name'
                })
                break;
            };
            case 'hp': {
                setFilter({
                    ...filter,
                    order: "hp"
                })
                break;
            };
            case 'attack': {
                setFilter({
                    ...filter,
                    order: "attack"
                })
                break;
            };
            case 'defense': {
                setFilter({
                    ...filter,
                    order: "defense"
                })
                break;
            };
            case 'speed': {
                setFilter({
                    ...filter,
                    order: "speed"
                })
                break;
            };
            case 'height': {
                setFilter({
                    ...filter,
                    order: "height"
                })
                break;
            };
            case 'weight': {
                setFilter({
                    ...filter,
                    order: "weight"
                })
                break;
            };
            case "desc": {
                setFilter({
                    ...filter,
                    direction: "DESC"
                })
                break;
            };
            case "asc": {
                setFilter({
                    ...filter,
                    direction: "ASC"
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
        <div className="filter">
            <div className='filter__types' >
                {allTypes.map((type) => {
                    return (
                        <TypeIcon key={type.id} name={type.name} handleFilters={handleFilters} />
                    )
                })}
            </div>
            <select onChange={(e) => handleFilters(e)} name="Order">
                <option value="Any" hidden={true}>Sort By</option>
                <option value="name">Name</option>
                <option value="hp">Health</option>
                <option value="attack">Attack</option>
                <option value="defense">Defense</option>
                <option value="speed">Speed</option>
                <option value="height">Height</option>
                <option value="weight">Weight</option>
            </select>
            <select onChange={(e) => handleFilters(e)} name="Direction">
                <option value="Any" hidden={true}>AV</option>
                <option value="asc">Up</option>
                <option value="desc">Down</option>
            </select>
            <button
                className="realodButton"
                onClick={(e) => {
                    handleClick(e);
                }}
            >
                Reload Pokemons
            </button>
            <SearchBar />
        </div>
    )
}

