let sharedSalonData = {};

export const setSharedSalonData = (data) => {
    sharedSalonData = data;
};

export const getSharedSalonData = () => {
    return sharedSalonData;
};