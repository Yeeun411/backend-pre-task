const { 
    createProfileCard, 
    getProfileCard,
    createCareerField,
    createProfileField,
    updateProfileField, 
    updateCareerField, 
    deleteProfileCard 
} = require("../repositories/profile_cards");

const { createValueStructures } = require("../utils/value_structure");

exports.createProfileCardService = async (createDto) => {
    const createProfileResult = await createProfileCard(createDto);
    const profileId = createProfileResult.id;

    await createProfileField(profileId, "nickname", " 닉네임 ", null);
    await createProfileField(profileId, "phonenumber" ," 전화번호 ", null);
    await createProfileField(profileId, "email", " 이메일 ", null);
    await createProfileField(profileId, "birthday", " 생년월일 ", null);
    await createProfileField(profileId, "gender", " 성별 ", null);
    await createCareerField(profileId, null, null, null, null, null);

    
    return createProfileResult;
};

exports.createProfileCardFieldService = async (id, field_key, field_value) => {
    const success = await createProfileField(id, field_key, field_value);
    return success ? "성공입니다." : "실패입니다.";
};


exports.getProfileCardService = async (id) => {
    const { profileCard, profileFields, careerFields } = await getProfileCard(id);
    if (!profileCard) return null;

    const profileFieldsObject = profileFields.reduce((obj, { field_key, field_value }) => {
        obj[field_key] = field_value;
        return obj;
    }, {});

    const value = {
        이름: profileCard.name,
        ...profileFieldsObject,
        경력사항: careerFields.map(({ company_name, role, start_date, end_date }) => ({
            회사명: company_name,
            업무: role,
            입사일: start_date,
            퇴사일: end_date
        }))
    };

    const valueStructures = createValueStructures(profileCard.name, profileFields, careerFields);
    return { value: value, valueStructures: valueStructures };
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