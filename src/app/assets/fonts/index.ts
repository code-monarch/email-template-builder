import localFont from 'next/font/local';


export const rubik = localFont({
    src: [
        {
            path: './Rubik-VariableFont_wght.ttf',
            weight: '700',
            style: 'normal',
        },
        {
            path: './Rubik-VariableFont_wght.ttf',
            weight: '600',
            style: 'normal',
        },
        {
            path: './Rubik-VariableFont_wght.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: './Rubik-VariableFont_wght.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './Rubik-VariableFont_wght.ttf',
            weight: '300',
            style: 'normal',
        },
        {
            path: './Rubik-VariableFont_wght.ttf',
            weight: '200',
            style: 'normal',
        },
    ],
    variable: '--font-rubik',
});