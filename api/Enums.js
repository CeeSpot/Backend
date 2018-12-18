const GUEST_USER = 1000,
    FELLOW = 2000,
    PARTNER = 3000,
    STANDARD_USER = 4000,
    ADMIN = 5000;

const SOCIAL_MEDIA_USER = 1,
    SOCIAL_MEDIA_COMPANY = 2,
    SOCIAL_MEDIA_EVENT = 3;

function getSocialMediaResourceDataBaseByType(type){
    if (type === SOCIAL_MEDIA_USER) return 'users';
    if (type === SOCIAL_MEDIA_COMPANY) return 'companies';
    if (type === SOCIAL_MEDIA_EVENT) return 'events';
    return null;
}
module.exports = {
    'userRoles': {
        'GUEST_USER': GUEST_USER,
        'FELLOW': FELLOW,
        'PARTNER': PARTNER,
        'STANDARD_USER': STANDARD_USER,
        'ADMIN': ADMIN,
    },
    'socialMediaRoles' : {
        'SOCIAL_MEDIA_USER':SOCIAL_MEDIA_USER,
        'SOCIAL_MEDIA_COMPANY': SOCIAL_MEDIA_COMPANY,
        'SOCIAL_MEDIA_EVENT': SOCIAL_MEDIA_EVENT,
        'getSocialMediaResourceDataBaseByType': getSocialMediaResourceDataBaseByType
    }
};