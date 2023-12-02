const { 
    createProfileCard, 
    getProfileCard,
    createProfileCardField,
    updateProfileField, 
    updateCareerField, 
    deleteProfileCard 
} = require("../repositories");

const { createValueStructures } = require("../utils");

exports.createProfileCardService = async (createDto) => {
    const createProfileResult = await createProfileCard(createDto)

    await createProfileCardFieldService(createProfileResult.id, "닉네임", null);
    await createProfileCardFielService(createProfileResult.id, "전화번호", null);
    await createProfileCardFieldService(createProfileResult.id, "이메일", null);
    await createProfileCardFieldService(createProfileResult.id, "생년월일", null);
    await createProfileCardFieldService(createProfileResult.id, "성별", null);
    
    return createProfileResult;
};

exports.createProfileCardFieldService = async (id, field_key, field_value) => {
    const success = await createProfileCardField(id, field_key, field_value);
    return success ? "성공입니다." : "실패입니다.";
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

    const valueStructures = createValueStructures(profileFields, careerFields);
    return { value, valueStructures };
};

exports.updateProfileCardService = async (id, updateDto) => {
    const { parentDataKey, itemIndex, newValue } = updateDto;

    if (parentDataKey === 'profile_field') {
        return await updateProfileField(id, newValue);
    } else if (parentDataKey === 'career_field') {
        return await updateCareerField(id, itemIndex, newValue);
    } else {
        return false;
    }
};

exports.deleteProfileCardService = async (id) => {
    const success = await deleteProfileCard(id);
    return success ? "성공적으로 삭제되었습니다." : "삭제에 실패했습니다.";
};
