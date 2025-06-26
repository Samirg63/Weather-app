
const Widget = () => {
  return (
    <div className="bg-[url('/assets/Widgets/Sun-Widget.png')] w-[150px] h-[150px] rounded-2xl cursor-pointer">
        <div className="w-full h-full rounded-2xl bg-[rgba(0,0,0,.3)] hover:bg-[rgba(0,0,0,.1)] duration-200 text-white p-2 flex flex-col justify-between">
            <h2 className="text-3xl">25º</h2>
            <p className="text-lg">Gothan - AL</p>
        </div>
    </div>
  )
}

export default Widget