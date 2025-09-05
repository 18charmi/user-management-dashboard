function LinearLoader({ loading }: { loading: boolean }) {
    if (!loading) return <></>
    return <div className="w-full h-1 bg-gray-200">
        <div className="h-full w-1/3 animate-[progress_1s_linear_infinite] bg-blue-500"></div>
    </div>
}
export default LinearLoader;