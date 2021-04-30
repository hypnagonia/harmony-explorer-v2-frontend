export const palette = {
  LightGrey: '#e7ecf7',
  Grey: '#b1b1b1',
  CoolGray: '#758796',
  Purple: '#7127e9',
  ElectricBlue: '#00AEE9',
  MintGreen: '#69FABD',
  MidnightBlue: '#1B295E',
}

export const theme = {
  global: {
    focus: {
      border: {
        color: 'transparent'
      }
    },
    colors: {
      brand: palette.Purple,
      border: palette.LightGrey,
      majorText: palette.MidnightBlue,
      minorText: palette.CoolGray,
      iconMain: palette.ElectricBlue,
      mintGreen: palette.MintGreen,
    },
    palette,
    font: {
      family: 'Nunito',
      size: '14px',
      height: '20px'
    }
  },
  anchor: {
    textDecoration: 'none',
    hover: {
      textDecoration: 'none'
    }
  },
  dataTable: {
    body: {
      extend: () => `
        tr:first-child {
          th, td {
            border: none !important;
          }
        }
      `
    }
  }
}