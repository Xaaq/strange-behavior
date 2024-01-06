import {user} from "../../jest.setup"
import {act, render, screen, waitFor} from "@testing-library/react"
import React, {useState} from "react"
import axios from "axios"
import useSWR from "swr";
import MockAdapter from "axios-mock-adapter";


export default function Activities() {
    const {data, mutate, error} = useSWR(
        `http://localhost:8000/activity`,
        url => axios<{ name: string }>({method: "GET", url})
            .then(r => r.data)
            .then(data => data)
            .then(data => data)
            .then(data => data)
            .then(data => data)
            // .then(data => data)
    )
    const [message, setMessage] = useState("")


    if (data === undefined)
        return <div>loading</div>

    return <>
        {message}
        data name: {data.name}
        <button
            onClick={async () => {
                // here would be a function that makes a backend call to change the name, but let's omit it
                await mutate(_ => ({name: "second name"}))
                setMessage("name changed")
            }}
        >
            change activity name
        </button>
    </>
}

export const axiosMock = new MockAdapter(axios)

test("pressing activity remove button removes activity", async () => {
    // given
    axiosMock.onGet(`http://localhost:8000/activity`).reply(200, {name: "first name"})

    render(<Activities/>)
    await waitFor(() => expect(screen.getByText(/change activity name/i)).toBeInTheDocument())
    await waitFor(() => expect(screen.getByText(/data name: first name/i)).toBeInTheDocument())

    // when
    axiosMock.onGet(`http://localhost:8000/activity`).reply(500, {})
    await user.click(screen.getByRole("button", {name: /change activity name/i}))

    // then
    await waitFor(() => expect(screen.getByText(/name changed/i)).toBeInTheDocument())
    await waitFor(() => expect(screen.getByText(/data name: second name/i)).toBeInTheDocument())
})
