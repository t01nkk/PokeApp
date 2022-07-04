import React from 'react'
import {
    filterPokemons,
    filterByCreated
} from "../redux/actions/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function Filters() {
    const allTypes = useSelector((state) => state.types);
    const allPokes = useSelector((state) => state.pokemons);
    const dispatch = useDispatch();
    const [filter, setFilter] = useState({
        typeFilter: "default",
        order: 'default'
    });

    function resetFilters() {
        setFilter({
            typeFilter: 'default',
            order: 'default',
        })
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
            <div >
                <label>Order by</label>
                <select onChange={(e) => handleFilters(e)} name="Order">
                    <option value="Any" hidden={true}>Default</option>
                    <option value="nameUp">Order A-Z</option>
                    <option value="nameDown">Order Z-A</option>
                    <option value="attackUp">Attack +</option>
                    <option value="attackDown">Attack -</option>
                </select>
            </div>
            <div>
                <label>Filter by Type</label>
                <select
                    onChange={(e) => handleFilters(e)}
                    name="type"
                >
                    <option value="All" hidden={true}>All </option>
                    {allTypes.map((type) => {
                        return <option value={type.name} key={type.id}>{type.name}</option>;
                    })}
                </select>
            </div>

        </div>
    )
}

