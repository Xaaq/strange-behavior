import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import {render} from "@testing-library/react";

export const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime})

beforeEach(() => {
    jest.useFakeTimers()
})
afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
})


const someRandomVariable = render
