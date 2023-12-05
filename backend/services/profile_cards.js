const { 
    createProfileCard, 
    getProfileCard,
    createCareerField,
    createProfileField,
    updateProfileField, 
    updateCareerField,
    createCareerFieldIndex,
    updateProfileCardName,
    deleteProfileCard 
} = require("../repositories/profile_cards");

const { createValueStructures } = require("../utils/value_structure");

exports.createProfileCardService = async (createDto) => {
    const createProfileResult = await createProfileCard(createDto);
    const profileId = createProfileResult.id;

    const nickname = "닉네임";
    const phonenumber = "전화번호";
    const email = "이메일";
    const birthday = "생년월일";
    const gender = "성별";

    await createProfileField(profileId, "nickname", nickname, null, "text");
    await createProfileField(profileId, "phonenumber" ,phonenumber, null, "phone");
    await createProfileField(profileId, "email", email, null, "email");
    await createProfileField(profileId, "birthday", birthday, null, "date");
    await createProfileField(profileId, "gender", gender, null, "text");
    await createCareerField(profileId, 1, null, null, null, null, null);

    
    return createProfileResult;
};

exports.createProfileCardFieldService = async (id, field_key,field_label,field_value) => {
    const success = await createProfileField(id, field_key,field_label, field_value);
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
        name: profileCard.name,
        ...profileFieldsObject,
        career: careerFields.map(({ company_name, role, start_date, end_date }) => ({
            company_name: company_name,
            role: role,
            start_date: start_date,
            end_date: end_date
        }))
    };

    const valueStructures = createValueStructures(profileCard.name, profileFields, careerFields);
    return { profileCardDetail: { value: value, valueStructures: valueStructures} };
};

exports.updateProfileCardService = async (id, updateDto) => {
    const { parentDataKey, itemIndex, newValue } = updateDto;

    if (newValue.name) {
        return await updateProfileCardName(id, newValue.name);
    }
    if (parentDataKey === 'career' && newValue === null) {
        return await createCareerFieldIndex(id, itemIndex, newValue);
    }
    if (parentDataKey === 'career') {
        return await updateCareerField(id, newValue);
    }

    return await updateProfileField(id, newValue);

};

exports.deleteProfileCardService = async (id) => {
    const success = await deleteProfileCard(id);
    return success ? "성공적으로 삭제되었습니다." : "삭제에 실패했습니다.";
};