import { Link } from "react-router-dom";

const PilihKategori = () => {
  return (
    <>
      <section>
        <div className='flex flex-col items-center'>
          <p className='font-bold text-[32px] mb-6'>Pilih kategori</p>
          <Link className='box-category'>
            <div>
              <p className='text-choose-category'>Mobil Bekas</p>
            </div>
          </Link>
          <Link className='box-category'>
            <div>
              <p className='text-choose-category'>Motor Bekas</p>
            </div>
          </Link>
          <Link className='box-category'>
            <div>
              <p className='text-choose-category'>Property</p>
            </div>
          </Link>
          <Link className='box-category'>
            <div>
              <p className='text-choose-category'>Elektronik & Gadget</p>
            </div>
          </Link>
          <Link className='box-category'>
            <div>
              <p className='text-choose-category'>Hobi & Olahraga</p>
            </div>
          </Link>
        </div>
      </section>
    </>
  )
}

export default PilihKategori