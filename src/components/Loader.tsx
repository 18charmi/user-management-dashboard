function LinearLoader({ loading }: { loading: boolean }) {
    if (!loading) return <></>
    return <div className="w-full h-1 bg-gray-200">
        <div className="h-1 bg-blue-500 animate-pulse w-full"></div>
    </div>
}
export default LinearLoader;