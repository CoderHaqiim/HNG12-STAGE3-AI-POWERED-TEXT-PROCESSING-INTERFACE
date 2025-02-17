export default function useTimestamp() {
    const time = new Date()
    const hour = time.getHours().toString().padStart(2,0)
    const minutes = time.getMinutes().toString().padStart(2,0)

    return(`${hour}:${minutes}`)
}
