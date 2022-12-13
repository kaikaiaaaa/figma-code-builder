# figma-code-builder

## Introduction

A tool for quickly generating vue3 code from figma designs

## Features

- [ ] Fetch schema data for components from figma openapi
- [ ] Reference the component with a specific name in figma
- [ ] Generate code through the schema data
- [ ] Insert the generated code into the corresponding project directory
- [ ] Monitor design changes in real time and re-render the generated code

## Designing scheme

### For designers

- [ ] Components need to be grouped
- [ ] Components must follow an elastic layout
- [ ] Component naming convention is required
- [ ] Specify special names to refer existing components
    - The name start of the component is `button` to refer to the existing `button` component
    - The name start of the component is `nav` to refer to the existing `nav` component
- [ ] Non-existing components are named by componentId

### For developers

Get the complete schema data

- [ ] Gets the url of the component in figma
- [ ] Copy the url to the clipboard
- [ ] Monitor clipboard and run the url to get the complete schema data
- [ ] Insert the schema data into the components folder

Analysis schema data

- [ ] Correspondence between figma elements and dom elements

| Figma                                                        | Vue                                                          | Desc                                                                                                                                                                                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| "name": "DeviceItem"                                         | class:device-item                                            | className                                                                                                                                                                                                          |
| "layoutMode": "HORIZONTAL","VERTICAL"                        | HORIZONTAL:<br/>.device-item{<br />       display:flex;<br />       flex-direction:row;<br />}<br /><br />VERTICAL:<br />.device-item{<br />        display:flex;<br />        flex-direction:column;<br />} | The layout is divided into horizontally arrangement and vertical arrangement；                                                                                                                                      |
| "counterAxisAlignItems": "CENTER","MIN","MAX"                | CENTER:<br />.device-item{<br />        align-items: center;<br />}<br /><br />MIN:<br />.device-item{<br />        align-items: flex-start;<br />}<br /><br />MAX:<br />.device-item{<br />        align-items: flex-end;<br />} | Element alignment：Vertical center，top，bottom。                                                                                                                                                                      |
| "primaryAxisAlignItems": "SPACE_BETWEEN","MIN","MAX","CENTER" | SPACE_BETWEEN:<br />.device-item{<br />        justify-content: space-between;<br />}<br /><br />MIN:<br />.device-item{<br />        justify-content: flex-start;<br />}<br /><br />MAX:<br />.device-item{<br />        justify-content: flex-end;<br />}<br /><br />Center:<br />.device-item{<br />        justify-content: Center;<br />}<br | Horizontal alignment of elements：horizontal self adaptation，left，center，right.                                                                                                                                     |
| paddingLeft                                                  | padding-left                                                 |                                                                                                                                                                                                                    |
| paddingRight                                                 | padding-right                                                |                                                                                                                                                                                                                    |
| paddingTop                                                   | padding-top                                                  |                                                                                                                                                                                                                    |
| paddingBottom                                                | padding-bottom                                               |                                                                                                                                                                                                                    |
| "backgroundColor": {   "r": 0.800000011920929,   "g": 0.800000011920929,   "b": 0.800000011920929,   "a": 1 }, | backgroundColor:{rgba:(204,204,204,1)}                       | background-color:rgba value ranges from 0-1 to 0-255. Each item of rgb is rounded by *255. a does not need to be converted                                                                                         |
| "absoluteBoundingBox": {   "x": -128,   "y": -230,   "width": 195,   "height": 50 }, | min-width:'195px';<br />min-height:'50px';                   | x and y are the positioning of the component in the upper left corner canvas of figma. Adaptive layout，component width and height are separated by internal elements，so we set it to the minimum width and height. |
| children                                                     |                                                              | Nesting of components，the order in which component elements in children are presented in figma must be controlled.                                                                                                 |
| "characters": "rain",                                        | rain                                                         | The content filled by the dom                                                                                                                                                                                                           |
| "type": "TEXT",                                              |                                                              | The type of the dom element                                                                                                                                                                                                           |
| "style": {   "fontFamily": "Inter",  "fontWeight": 400,   "fontSize": 12,   "letterSpacing": 0,   "lineHeightPx": 14.0625 }, | "style": {   font-family": "Inter",    font-weight: 400,   font-size: '12px',letter-spacing: 0,   "line-height": 15}, | Some styles for "type": "TEXT" : "line-height": need to be rounded up.                                                                                                                                                                        |


