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
            // eslint-disable-next-line no-lone-blocks
            case 'name': {
                setFilter({
                    ...filter,
                    order: 'name'
                })
                break;
            };
            // eslint-disable-next-line no-lone-blocks
            case 'hp': {
                setFilter({
                    ...filter,
                    order: "hp"
                })
                break;
            };
            // eslint-disable-next-line no-lone-blocks
            case 'attack': {
                setFilter({
                    ...filter,
                    order: "attack"
                })
                break;
            };
            // eslint-disable-next-line no-lone-blocks
            case 'defense': {
                setFilter({
                    ...filter,
                    order: "defense"
                })
                break;
            };
            // eslint-disable-next-line no-lone-blocks
            case 'speed': {
                setFilter({
                    ...filter,
                    order: "speed"
                })
                break;
            };
            // eslint-disable-next-line no-lone-blocks
            case 'height': {
                setFilter({
                    ...filter,
                    order: "height"
                })
                break;
            };
            // eslint-disable-next-line no-lone-blocks
            case 'weight': {
                setFilter({
                    ...filter,
                    order: "weight"
                })
                break;
            };
            // eslint-disable-next-line no-lone-blocks
            case "desc": {
                setFilter({
                    ...filter,
                    direction: "DESC"
                })
                break;
            };
            // eslint-disable-next-line no-lone-blocks
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
            <div className='filters__types' >
                {allTypes.map((type) => {
                    return (
                        <TypeIcon key={type.id} name={type.name} handleFilters={handleFilters} />
                    )
                })}
            </div>
            <div className='filters__select'>
                <select onChange={(e) => handleFilters(e)} name="Order" className='filter__select_order'>
                    <option value="Any" hidden={true}>Sort By</option>
                    <option value="name">Name</option>
                    <option value="hp">Health</option>
                    <option value="attack">Attack</option>
                    <option value="defense">Defense</option>
                    <option value="speed">Speed</option>
                    <option value="height">Height</option>
                    <option value="weight">Weight</option>
                </select>
                <select onChange={(e) => handleFilters(e)} name="Direction" className='filter__select_order'>
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
        </div>
    )
}

