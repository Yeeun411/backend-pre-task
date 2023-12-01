const { 
    createProfile, 
    findProfileById, 
    findProfileFieldsById, 
    findCareerFieldsById, 
    updateProfile, 
    deleteProfile 
} = require("../repositories");


const { extractValueStructuresFromTables } = require('../utils/valueStructureExtractor');

exports.createProfileCardService = async (createDto) => {
    return await createProfile(createDto);
};

exports.getProfileCardService = async (id) => {
    const { profileCard, profileFields, careerFields } = await getProfileCard(id);
    if (!profileCard) return null;

    const profileFieldsObject = profileFields.reduce((obj, profile) => {
        obj[profile.field_key] = profile.field_value;
        return obj;
    }, {});

    const careerFieldsArray = careerFields.map(career => ({
        회사명: career.company_name,
        업무: career.role,
        입사일: career.start_date,
        퇴사일: career.end_date
    }));

    const value = {
        이름: profileCard.name,
        ...profileFieldsObject,
        경력사항: careerFieldsArray
    };

    const valueStructures = extractValueStructuresFromTables(profileFields, careerFields);

    return { value, valueStructures };
};

exports.updateProfileCardService = async (profileCardId, updateDto) => {
    return await updateProfile(profileCardId, updateDto);
};

exports.deleteProfileCardService = async (profileCardId) => {
    return await deleteProfile(profileCardId);
};
