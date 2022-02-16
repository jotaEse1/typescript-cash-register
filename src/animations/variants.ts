const modalBackgroundVariant = {
    hide: {opacity: 0},
    visible: {opacity: 1},
    exit: {opacity: 0}
}

const modalVariant = {
    hide: {x: '-100vw', scale: 0, opacity: 0},
    visible: {
        x: 0, 
        scale: 1,
        opacity: 1
    },
    exit: {x: '100vw', scale: 0, opacity: 0}
}

const modalMsgVariant = {
    hide: {y: -200, scale: 0, opacity: 0},
    visible: {
        y: 0, 
        scale: 1,
        opacity: 1
    },
    exit: {y: -1000, scale: 0, opacity: 0}
}

const modalChangeVariant = {
    hide: {y: '-100vh', scale: 0, opacity: 0},
    visible: {
        y: 0, 
        scale: 1,
        opacity: 1
    },
    exit: {y: '100vh', scale: 0, opacity: 0}
}

const appearVariant = {
    hide: {opacity: 0},
    visible: {opacity: 1},
}

const buttonVariant = {
    click: {scale: 0.5},
    hover: {scale: 1.1}
}


export {
    modalBackgroundVariant,
    modalVariant,
    modalMsgVariant,
    modalChangeVariant,
    appearVariant,
    buttonVariant
}