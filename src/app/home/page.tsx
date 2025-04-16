"use client"

import { useEffect, useState } from "react"
import { Advocate } from "../types/advocates"
import { logger } from "@/lib/logger"
import { API_ADVOCATES } from "../api/advocates/urls"

const HOME_PAGE_TAG = "Home"

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([])
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")

  useEffect(() => {
    logger({ tag: HOME_PAGE_TAG, message: "fetching advocates..." })
    fetch(API_ADVOCATES).then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data)
        setFilteredAdvocates(jsonResponse.data)
      })
    })
  }, [])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value

    setSearchTerm(searchTerm)

    logger({ tag: HOME_PAGE_TAG, message: "filtering advocates..." })
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        advocate.yearsOfExperience.toString().includes(searchTerm)
      )
    })

    setFilteredAdvocates(filteredAdvocates)
  }

  const onClick = () => {
    logger({ tag: HOME_PAGE_TAG, message: "Advocates data", data: advocates })
    setFilteredAdvocates(advocates)
  }

  return (
    <main className="m-6">
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span>{searchTerm}</span>
        </p>
        <input className="border border-black" onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </main>
  )
}
