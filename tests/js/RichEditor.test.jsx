import { render } from '@testing-library/react';
import RichEditor from '../../resources/js/Components/RichEditor';

// Mocking Tiptap since JSDOM doesn't support full layout calculations required by Prosemirror
jest.mock('@tiptap/react', () => ({
    useEditor: () => ({
        isActive: jest.fn(),
        chain: () => ({
            focus: () => ({
                toggleBold: jest.fn(),
                toggleItalic: jest.fn(),
                toggleStrike: jest.fn(),
                toggleHeading: jest.fn(),
                toggleBulletList: jest.fn()
            })
        })
    }),
    EditorContent: () => <div data-testid="editor-content">Editor Placeholder</div>
}));

describe('RichEditor Component', () => {
    it('renders the editor menu and content placeholder', () => {
        const { getByText, getByTestId } = render(<RichEditor />);

        expect(getByText('Bold')).toBeInTheDocument();
        expect(getByText('Ask Llama')).toBeInTheDocument();
        expect(getByTestId('editor-content')).toBeInTheDocument();
    });
});
