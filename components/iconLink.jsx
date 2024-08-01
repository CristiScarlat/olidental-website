import Link from 'next/link';

const IconLink = ({children, label, href}) => {
  return(
    <div className='d-flex align-items-center gap-2 justify-content-md-start justify-content-center px-2'>
      <Link href={href}>
        <div className="d-flex align-items-center gap-2">
          {children}
          <span className='custom-link-services pt-1'>{label}</span>
        </div>
      </Link>
    </div>
  )
}

export default IconLink;