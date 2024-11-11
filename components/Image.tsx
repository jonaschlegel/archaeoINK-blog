import NextImage from 'next/image'
import { ComponentProps } from 'react'

type NextImageProps = ComponentProps<typeof NextImage>

const Image = ({ ...rest }: NextImageProps) => <NextImage {...rest} />

export default Image
