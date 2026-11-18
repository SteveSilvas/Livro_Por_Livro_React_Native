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
import { Input } from '../../../UI/Input/index';
import { BookCard } from '../../../UI/BookCard';
import { MessageModal } from '../../../UI/MessageModal/index';
import { MessageModalPropsType } from '../../../@Types/MessageModalPropsType';
import { BookType, CategoryType } from '../../../@Types/api';
import { useAuth } from '../../../Context/AuthContext';
import { getErrorMessage } from '../../../Util/errors';
import * as booksApi from '../../../services/api/books';
import * as categoriesApi from '../../../services/api/categories';

const Home = ({ navigation }: any) => {
    const { user } = useAuth();
    const [books, setBooks] = useState<BookType[]>([]);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [formVisible, setFormVisible] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [autor, setAutor] = useState<string>('');
    const [categoryUuid, setCategoryUuid] = useState<string>('');
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

    const loadShelf = useCallback(async () => {
        setLoading(true);
        try {
            const page = await booksApi.listMyBooks({ limit: 50 });
            setBooks(page.data);
        } catch (error) {
            showModal(getErrorMessage(error, 'Não foi possível carregar sua estante.'));
        } finally {
            setLoading(false);
        }
    }, []);

    const loadCategories = useCallback(async () => {
        try {
            const list = await categoriesApi.listCategories();
            setCategories(list);
            if (list.length > 0) {
                setCategoryUuid((prev) => prev || list[0].Uuid);
            }
        } catch (error) {
            showModal(getErrorMessage(error, 'Não foi possível carregar as categorias.'));
        }
    }, []);

    useEffect(() => {
        loadShelf();
        loadCategories();
    }, [loadShelf, loadCategories]);

    const onCreateBook = async () => {
        if (!title || !autor || !categoryUuid) {
            showModal('Preencha título, autor e escolha uma categoria.');
            return;
        }
        try {
            await booksApi.createBook({
                Title: title,
                Autor: autor,
                CategoryUuid: categoryUuid,
            });
            setTitle('');
            setAutor('');
            setFormVisible(false);
            showModal('Livro cadastrado na sua estante!');
            await loadShelf();
        } catch (error) {
            showModal(getErrorMessage(error, 'Não foi possível cadastrar o livro.'));
        }
    };

    const renderMessageModal = () => (
        <MessageModal
            showModal={modal.showModal}
            message={modal.message}
            closeModal={modal.closeModal}
        />
    );

    const renderHeader = () => (
        <View>
            <Text style={styles.greeting}>Olá, {user?.Name ?? 'leitor'}!</Text>
            <Text style={styles.sectionTitle}>Minha estante</Text>
            {formVisible && (
                <View style={styles.form}>
                    <Text style={styles.label}>Título:</Text>
                    <Input type="default" value={title} onChange={setTitle} />
                    <Text style={styles.label}>Autor:</Text>
                    <Input type="default" value={autor} onChange={setAutor} />
                    <Text style={styles.label}>Categoria (UUID):</Text>
                    <Input
                        type="default"
                        placeholder={categories[0]?.Description ?? 'sem categorias'}
                        value={categoryUuid}
                        onChange={setCategoryUuid}
                    />
                    <Button text="Salvar livro" style={styles.button} onClick={onCreateBook} />
                    <Button
                        text="Cancelar"
                        style={styles.button}
                        onClick={() => setFormVisible(false)}
                    />
                </View>
            )}
            <Button
                text={formVisible ? 'Fechar formulário' : 'Adicionar livro'}
                style={styles.button}
                onClick={() => setFormVisible((prev) => !prev)}
            />
            <Button text="Atualizar estante" style={styles.button} onClick={loadShelf} />
        </View>
    );

    return (
        <SafeAreaView style={styles.root}>
            {renderMessageModal()}
            <FlatList
                data={books}
                keyExtractor={(item) => item.Uuid}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={
                    loading ? undefined : (
                        <Text style={styles.empty}>Sua estante está vazia.</Text>
                    )
                }
                renderItem={({ item }) => (
                    <BookCard book={item} showOwner={false} />
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
    greeting: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#785E91',
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    form: {
        borderWidth: 1,
        borderColor: '#7C8891',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        backgroundColor: '#FFFFFF',
    },
    label: {
        fontWeight: 'bold',
        marginTop: 6,
    },
    button: {
        marginTop: 8,
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

export default Home;
