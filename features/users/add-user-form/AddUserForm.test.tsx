import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AddUserForm } from "./AddUserForm";
import { Provider as ChakraProvider } from "@/features/chakra/provider";

jest.mock("../data-access/useAddUserMutation", () => ({
  useAddUserMutation: jest.fn(),
}));

jest.mock("../CountryDropdown", () => ({
  CountryDropdown: () => (
    <div data-testid="country-dropdown">Country Dropdown</div>
  ),
}));

jest.mock("../InterestsCheckboxGroup", () => ({
  InterestsCheckboxGroup: () => (
    <div data-testid="interests-checkbox">Interests Checkbox</div>
  ),
}));

jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: any;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// React query helper function
const createTestWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>{children}</ChakraProvider>
    </QueryClientProvider>
  );
};

describe("AddUserForm", () => {
  const mockMutate = jest.fn();
  const mockUseAddUserMutation =
    require("../data-access/useAddUserMutation").useAddUserMutation;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAddUserMutation.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });
  });

  const renderForm = () => {
    const Wrapper = createTestWrapper();
    return render(
      <Wrapper>
        <AddUserForm />
      </Wrapper>
    );
  };

  it("should display validation error for required full name field", async () => {
    const user = userEvent.setup();
    renderForm();

    const submitButton = screen.getByRole("button", { name: /add user/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("full name required")).toBeInTheDocument();
    });
  });

  it("should display validation error for required age field", async () => {
    const user = userEvent.setup();
    renderForm();

    const fullNameInput = screen.getByLabelText(/full name/i);
    await user.type(fullNameInput, "John Doe");

    const submitButton = screen.getByRole("button", { name: /add user/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("age required")).toBeInTheDocument();
    });
  });

  it("should display validation error when age is below minimum", async () => {
    const user = userEvent.setup();
    renderForm();

    const fullNameInput = screen.getByLabelText(/full name/i);
    const ageInput = screen.getByLabelText(/age/i);

    await user.type(fullNameInput, "John Doe");
    await user.type(ageInput, "16");

    const submitButton = screen.getByRole("button", { name: /add user/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("age must be 18 or above")).toBeInTheDocument();
    });
  });

  it("should display multiple validation errors simultaneously", async () => {
    const user = userEvent.setup();
    renderForm();

    const submitButton = screen.getByRole("button", { name: /add user/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("full name required")).toBeInTheDocument();
      expect(screen.getByText("age required")).toBeInTheDocument();
    });
  });

  it("should not clear form fields when submission fails", async () => {
    const user = userEvent.setup();

    mockMutate.mockImplementation(() => {});

    renderForm();

    const fullNameInput = screen.getByLabelText(/full name/i);
    const ageInput = screen.getByLabelText(/age/i);

    await user.type(fullNameInput, "John Doe");
    await user.type(ageInput, "25");

    const submitButton = screen.getByRole("button", { name: /add user/i });
    await user.click(submitButton);

    expect(fullNameInput).toHaveValue("John Doe");
    expect(ageInput).toHaveValue("25");
  });

  it("should show loading state during form submission", async () => {
    mockUseAddUserMutation.mockReturnValue({
      mutate: mockMutate,
      isPending: true,
    });

    renderForm();

    const submitButton = screen.getByRole("button", { name: /add user/i });

    expect(submitButton).toHaveAttribute("data-loading", "");
  });

  it("should not show validation errors before form submission attempt", () => {
    renderForm();

    expect(screen.queryByText("full name required")).not.toBeInTheDocument();
    expect(screen.queryByText("age required")).not.toBeInTheDocument();
    expect(
      screen.queryByText("age must be 18 or above")
    ).not.toBeInTheDocument();
  });

  it("should clear validation errors when valid input is provided", async () => {
    const user = userEvent.setup();
    renderForm();

    const submitButton = screen.getByRole("button", { name: /add user/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("full name required")).toBeInTheDocument();
    });

    const fullNameInput = screen.getByLabelText(/full name/i);
    await user.type(fullNameInput, "John Doe");

    await waitFor(() => {
      expect(screen.queryByText("full name required")).not.toBeInTheDocument();
    });
  });
});
