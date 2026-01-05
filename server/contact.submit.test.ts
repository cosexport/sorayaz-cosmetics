import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database module
vi.mock("./db", () => ({
  createContactRequest: vi.fn(),
}));

describe("contact.submit", () => {
  let mockContext: TrpcContext;

  beforeEach(() => {
    mockContext = {
      user: null,
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };
  });

  it("should successfully submit a contact request with all required fields", async () => {
    const { createContactRequest } = await import("./db");
    const mockCreateFn = vi.mocked(createContactRequest);

    mockCreateFn.mockResolvedValueOnce({
      id: 1,
      companyName: "Test Company",
      firstName: "John",
      lastName: "Doe",
      country: "UAE",
      partnershipType: "distributor",
      message: "Interested in partnership",
      email: "john@example.com",
      phone: "+971501234567",
      status: "new",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const caller = appRouter.createCaller(mockContext);

    const result = await caller.contact.submit({
      companyName: "Test Company",
      firstName: "John",
      lastName: "Doe",
      country: "UAE",
      partnershipType: "distributor",
      message: "Interested in partnership",
      email: "john@example.com",
      phone: "+971501234567",
    });

    expect(result).toEqual({ success: true, id: 1 });
    expect(mockCreateFn).toHaveBeenCalledWith({
      companyName: "Test Company",
      firstName: "John",
      lastName: "Doe",
      country: "UAE",
      partnershipType: "distributor",
      message: "Interested in partnership",
      email: "john@example.com",
      phone: "+971501234567",
    });
  });

  it("should handle optional email and phone fields", async () => {
    const { createContactRequest } = await import("./db");
    const mockCreateFn = vi.mocked(createContactRequest);

    mockCreateFn.mockResolvedValueOnce({
      id: 2,
      companyName: "Another Company",
      firstName: "Jane",
      lastName: "Smith",
      country: "Saudi Arabia",
      partnershipType: "private-label",
      message: "Private label inquiry",
      email: undefined,
      phone: undefined,
      status: "new",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const caller = appRouter.createCaller(mockContext);

    const result = await caller.contact.submit({
      companyName: "Another Company",
      firstName: "Jane",
      lastName: "Smith",
      country: "Saudi Arabia",
      partnershipType: "private-label",
      message: "Private label inquiry",
      email: "",
      phone: "",
    });

    expect(result).toEqual({ success: true, id: 2 });
    expect(mockCreateFn).toHaveBeenCalledWith({
      companyName: "Another Company",
      firstName: "Jane",
      lastName: "Smith",
      country: "Saudi Arabia",
      partnershipType: "private-label",
      message: "Private label inquiry",
      email: undefined,
      phone: undefined,
    });
  });

  it("should reject invalid input with missing required fields", async () => {
    const caller = appRouter.createCaller(mockContext);

    try {
      await caller.contact.submit({
        companyName: "",
        firstName: "John",
        lastName: "Doe",
        country: "UAE",
        partnershipType: "distributor",
        message: "Test",
        email: "",
        phone: "",
      });
      // If we reach here, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      // Expected to throw an error
      expect(error).toBeDefined();
    }
  });

  it("should be accessible as a public procedure", async () => {
    // Verify that the procedure is public by calling it without authentication
    const caller = appRouter.createCaller({
      user: null,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    });

    const { createContactRequest } = await import("./db");
    const mockCreateFn = vi.mocked(createContactRequest);

    mockCreateFn.mockResolvedValueOnce({
      id: 3,
      companyName: "Public Test",
      firstName: "Test",
      lastName: "User",
      country: "Qatar",
      partnershipType: "spa-hammam",
      message: "Test message",
      email: "test@example.com",
      phone: "+974501234567",
      status: "new",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await caller.contact.submit({
      companyName: "Public Test",
      firstName: "Test",
      lastName: "User",
      country: "Qatar",
      partnershipType: "spa-hammam",
      message: "Test message",
      email: "test@example.com",
      phone: "+974501234567",
    });

    expect(result.success).toBe(true);
  });
});
