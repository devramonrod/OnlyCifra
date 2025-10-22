import { useAuth } from '@/context/AuthContext';
import { Group } from '@/libs/domain/Group/Group';
import { Plan } from '@/libs/domain/Plan/Plan';
import { User } from '@/libs/domain/users/member/User';
import { ColorUtils } from '@/libs/utils/ColorUtils';
import { formatDateToPtBr } from '@/libs/utils/formatDateBr';
import { StringUtils } from '@/libs/utils/StringUtils';
import { findGroupsById } from '@/service/GroupService';
import { findPlansById } from '@/service/PlanService';
import { findUserById, updateUser } from '@/service/UserService';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import InfoRow from '../infoRow/infoRow';

type Props = {
    userId?: string;
};

export default function Profile({ userId }: Props) {
    const { user } = useAuth();
    const [data, setData] = useState<User>();
    const [group, setGroup] = useState<Group>();
    const [plan, setPlan] = useState<Plan>();
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editUser, setEditUser] = useState<User>();
    const [isUserProfile, setIsUserProfile] = useState(false);

    const effectiveUserId = userId == user?.uid;

    const instagram = data?.instagram
        ? data.instagram.split("@").at(1)
        : StringUtils.EMPTY;

    function handleChange(field: keyof User, value: string) {
        setEditUser(prev => {
            const data = { ...prev, [field]: value };
            return User.fromJson(data);
        });
    };

    function isCurrentUserProfile(): boolean {
        if (!userId && user?.uid) return true;
        return userId === user?.uid;
    }

    async function handleSubmit() {
        if (effectiveUserId && editUser) {
            const updateData: Partial<User> = {
                name: editUser.name,
                phone: editUser.phone,
                cpf: editUser.cpf,
                instagram: editUser.instagram,
            };

            await updateUser(String(user?.uid), updateData);
            setData(editUser);
            setEditModalVisible(false);
        }
    }

    async function fetchProfileData(id: string) {
        if (id) {
            try {
                const userData = await findUserById(id);
                if (userData) {
                    setData(userData);

                    const groupId = Array.isArray(userData.memberOfGroups) && userData.memberOfGroups.length > 0
                        ? userData.memberOfGroups[0]
                        : undefined;

                    const groupPromise = groupId
                        ? findGroupsById(groupId)
                        : Promise.resolve(undefined);

                    const planPromise = userData.activePlan
                        ? findPlansById(userData.activePlan)
                        : Promise.resolve(undefined);

                    const [groupData, planData] = await Promise.all([groupPromise, planPromise]);

                    if (groupData) setGroup(groupData);
                    if (planData) setPlan(planData);
                }
            } catch (error) {
                console.error("Erro ao buscar dados do perfil:", error);
            }
        } else {
            setData(undefined);
            setGroup(undefined);
            setPlan(undefined);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchProfileData(userId);
        } else {
            fetchProfileData(String(user?.uid));
        }

    }, [effectiveUserId]);

    useEffect(() => {
        setIsUserProfile(isCurrentUserProfile());
    }, [userId, user]);

    return (
        <ScrollView className="flex-1 bg-bgSecondary">
            <StatusBar barStyle="light-content" />
            <View className="p-6">
                <View className="items-start">
                    <Text className="text-3xl font-bold text-secondary">{data?.name}</Text>
                    <Text className="text-md text-gray-400 mt-3">{data?.email}</Text>
                </View>

                <View className="flex-row justify-around my-8 bg-gray-800 p-4 rounded-xl">
                    <View className="items-center">
                        <Text className="text-2xl font-bold text-secondary">{data?.receivedLikes ?? 0}</Text>
                        <Text className="text-sm text-gray-400">Likes Recebidos</Text>
                    </View>
                    <View className="items-center">
                        <View className={`px-3 py-1 rounded-full ${data?.isActive ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                            <Text className={`font-bold ${data?.isActive ? 'text-third' : 'text-red-400'}`}>
                                {data?.isActive ? 'Ativo' : 'Inativo'}
                            </Text>
                        </View>
                        <Text className="text-sm text-gray-400 mt-1">Status da Conta</Text>
                    </View>
                </View>

                <View className="bg-gray-800 rounded-xl overflow-hidden">
                    <InfoRow icon={<Ionicons name="call-outline" size={24} color={ColorUtils.DEFAULT} />} label="Telefone" value={data?.phone} />

                    <Link href={`https://www.instagram.com/${instagram}`} >
                        <InfoRow
                            icon={<Ionicons name="logo-instagram" size={24} color={ColorUtils.DEFAULT} />}
                            label="Instagram"
                            value={data?.instagram}
                        />
                    </Link>
                    <InfoRow
                        icon={<Ionicons name="calendar-outline" size={24} color={ColorUtils.DEFAULT} />}
                        label="Data de Nascimento"
                        value={formatDateToPtBr(data?.birthdate)}
                    />
                    <InfoRow icon={<MaterialCommunityIcons name="form-textbox" size={24} color={ColorUtils.DEFAULT} />} label="CPF" value={data?.cpf} />
                    <InfoRow icon={<Ionicons name="people-outline" size={24} color={ColorUtils.DEFAULT} />} label="Grupo" value={group?.name} />
                    <InfoRow icon={<Ionicons name="star-outline" size={24} color={ColorUtils.DEFAULT} />} label="Plano" value={plan?.name} />
                    <InfoRow
                        icon={<Ionicons name="time-outline" size={24} color={ColorUtils.DEFAULT} />}
                        label="Cadastro"
                        value={formatDateToPtBr(data?.createdAt)}
                    />
                </View>

                {isUserProfile && (
                    <TouchableOpacity
                        className="bg-third p-4 rounded-xl items-center justify-center mt-8 mb-12"
                        onPress={() => {
                            setEditUser(data);
                            setEditModalVisible(true);
                        }}
                    >
                        <Text className="text-secondary font-bold text-lg">Editar Perfil</Text>
                    </TouchableOpacity>
                )}

            </View>

            <Modal visible={editModalVisible} transparent animationType="slide">
                <View className="flex-1 bg-black/70 justify-center items-center">
                    <View className="bg-bgSecondary rounded-2xl w-11/12 p-6">
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 20 }}
                        >
                            <Text className="text-2xl text-secondary font-bold mb-6 text-center">
                                Editar Perfil
                            </Text>

                            <Text className="text-gray-400 mb-2 ml-1">Nome Completo</Text>
                            <TextInput
                                placeholder="Nome Completo"
                                placeholderTextColor={ColorUtils.DEFAULT}
                                value={editUser?.name || StringUtils.EMPTY}
                                onChangeText={(text) => handleChange('name', text)}
                                className="bg-gray-800 text-secondary p-4 rounded-xl mb-4 text-lg"
                            />

                            <Text className="text-gray-400 mb-2 ml-1">Telefone</Text>
                            <TextInput
                                placeholder="(99) 99999-9999"
                                placeholderTextColor={ColorUtils.DEFAULT}
                                value={editUser?.phone || StringUtils.EMPTY}
                                onChangeText={(text) => handleChange('phone', text)}
                                className="bg-gray-800 text-secondary p-4 rounded-xl mb-4 text-lg"
                                keyboardType="phone-pad"
                            />

                            <Text className="text-gray-400 mb-2 ml-1">CPF</Text>
                            <TextInput
                                placeholder="000.000.000-00"
                                placeholderTextColor={ColorUtils.DEFAULT}
                                value={editUser?.cpf || StringUtils.EMPTY}
                                onChangeText={(text) => handleChange('cpf', text)}
                                className="bg-gray-800 text-secondary p-4 rounded-xl mb-4 text-lg"
                                keyboardType="numeric"
                            />

                            <Text className="text-gray-400 mb-2 ml-1">Instagram</Text>
                            <TextInput
                                placeholder="@usuario"
                                placeholderTextColor={ColorUtils.DEFAULT}
                                value={editUser?.instagram || StringUtils.EMPTY}
                                onChangeText={(text) => handleChange('instagram', text)}
                                className="bg-gray-800 text-secondary p-4 rounded-xl mb-6 text-lg"
                            />

                            <View className='flex-row justify-between flex-1 items-center mt-6'>
                                <TouchableOpacity
                                    className="bg-third p-4 rounded-xl items-center mb-3"
                                    onPress={handleSubmit}
                                >
                                    <Text className="text-secondary font-bold text-lg">Salvar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    className="bg-red-500 p-4 rounded-xl items-center mb-3"
                                    onPress={() => setEditModalVisible(false)}
                                >
                                    <Text className="text-secondary font-bold text-lg">Cancelar</Text>
                                </TouchableOpacity>
                            </View>

                        </ScrollView>
                    </View>
                </View>
            </Modal>

        </ScrollView>
    );
}
