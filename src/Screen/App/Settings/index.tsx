import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Button from '../../../UI/Button';
import { BookCard } from '../../../UI/BookCard';
import { MessageModal } from '../../../UI/MessageModal/index';
import { MessageModalPropsType } from '../../../@Types/MessageModalPropsType';
import {
    CategoryType,
    FavoriteBookType,
    PublicUserType,
} from '../../../@Types/api';
import { getErrorMessage } from '../../../Util/errors';
import * as categoriesApi from '../../../services/api/categories';
import * as favoritesApi from '../../../services/api/favorites';

type SettingsTab = 'categories' | 'favoriteBooks' | 'favoriteShelves';

const SettingsScreen = ({ navigation }: any) => {
    const [tab, setTab] = useState<SettingsTab>('categories');
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [favoriteBooks, setFavoriteBooks] = useState<FavoriteBookType[]>([]);
    const [favoriteShelves, setFavoriteShelves] = useState<PublicUserType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [modal, setModal] = useState<MessageModalPropsType>({
        message: '',
        showModal: false,
        closeModal: hideModal,
    });

    function hideModal(): void {
        setModal((prev) => ({ ...prev, showModal: false }));
    }

    const showModal = (message: string): void => {
        setModal({ message, showModal: true, closeModal: hideModal });
    };

    const load = useCallback(async (target: SettingsTab) => {
        setLoading(true);
        try {
            if (target === 'categories') {
                setCategories(await categoriesApi.listCategories());
            } else if (target === 'favoriteBooks') {
                const page = await favoritesApi.listFavoriteBooks({ limit: 50 });
                setFavoriteBooks(page.data);
            } else {
                const page = await favoritesApi.listFavoriteShelves({ limit: 50 });
                setFavoriteShelves(page.data);
            }
        } catch (error) {
            showModal(getErrorMessage(error, 'Não foi possível carregar os dados.'));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        load(tab);
    }, [tab, load]);

    const renderMessageModal = () => (
        <MessageModal
            showModal={modal.showModal}
            message={modal.message}
            closeModal={modal.closeModal}
        />
    );

    const renderTabs = () => (
        <View>
            <Text style={styles.title}>Configurações</Text>
            <Button
                text="Categorias"
                style={styles.button}
                onClick={() => setTab('categories')}
            />
            <Button
                text="Livros favoritos"
                style={styles.button}
                onClick={() => setTab('favoriteBooks')}
            />
            <Button
                text="Estantes favoritas"
                style={styles.button}
                onClick={() => setTab('favoriteShelves')}
            />
            <Button
                text="Recarregar"
                style={styles.button}
                onClick={() => load(tab)}
            />
        </View>
    );

    if (tab === 'categories') {
        return (
            <SafeAreaView style={styles.root}>
                {renderMessageModal()}
                <FlatList
                    data={categories}
                    keyExtractor={(item) => item.Uuid}
                    ListHeaderComponent={renderTabs}
                    ListEmptyComponent={
                        loading ? undefined : (
                            <Text style={styles.empty}>Nenhuma categoria.</Text>
                        )
                    }
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.itemTitle}>{item.Description}</Text>
                        </View>
                    )}
                    contentContainerStyle={styles.list}
                />
                {loading && <ActivityIndicator style={styles.loading} />}
            </SafeAreaView>
        );
    }

    if (tab === 'favoriteBooks') {
        return (
            <SafeAreaView style={styles.root}>
                {renderMessageModal()}
                <FlatList
                    data={favoriteBooks}
                    keyExtractor={(item) => item.Uuid}
                    ListHeaderComponent={renderTabs}
                    ListEmptyComponent={
                        loading ? undefined : (
                            <Text style={styles.empty}>
                                Você ainda não favoritou livros.
                            </Text>
                        )
                    }
                    renderItem={({ item }) => <BookCard book={item} />}
                    contentContainerStyle={styles.list}
                />
                {loading && <ActivityIndicator style={styles.loading} />}
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.root}>
            {renderMessageModal()}
            <FlatList
                data={favoriteShelves}
                keyExtractor={(item) => item.Uuid}
                ListHeaderComponent={renderTabs}
                ListEmptyComponent={
                    loading ? undefined : (
                        <Text style={styles.empty}>
                            Você ainda não favoritou estantes.
                        </Text>
                    )
                }
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.itemTitle}>{item.Name}</Text>
                        <Text style={styles.itemSubtitle}>
                            {item.followersCount ?? 0} seguidores
                        </Text>
                    </View>
                )}
                contentContainerStyle={styles.list}
            />
            {loading && <ActivityIndicator style={styles.loading} />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#FFF7D9',
    },
    list: {
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#785E91',
        marginBottom: 8,
    },
    button: {
        marginTop: 8,
    },
    item: {
        borderWidth: 1,
        borderColor: '#7C8891',
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4B3B5A',
    },
    itemSubtitle: {
        fontSize: 12,
        color: '#7C8891',
    },
    empty: {
        textAlign: 'center',
        color: '#7C8891',
        marginTop: 16,
    },
    loading: {
        marginVertical: 12,
    },
});

export default SettingsScreen;
