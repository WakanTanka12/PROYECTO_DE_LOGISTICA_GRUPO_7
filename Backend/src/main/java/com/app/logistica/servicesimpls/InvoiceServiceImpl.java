package com.app.logistica.servicesimpls;

import com.app.logistica.dtos.InvoiceDTO;
import com.app.logistica.entities.Customer;
import com.app.logistica.entities.Invoice;
import com.app.logistica.entities.Order;
import com.app.logistica.exceptions.ResourceNotFoundException;
import com.app.logistica.mapperdtos.CustomerMapper;
import com.app.logistica.mapperdtos.InvoiceMapper;
import com.app.logistica.repositories.InvoiceRepository;
import com.app.logistica.repositories.OrderRepository;
import com.app.logistica.services.InvoiceService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class InvoiceServiceImpl implements InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final OrderRepository orderRepository;

    private Invoice verifyInvoice (Long id) {
        return invoiceRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Invoice not found"));
    }

    @Override
    public InvoiceDTO createInvoice(InvoiceDTO invoiceDTO) {
        if (invoiceDTO.getOrderId() == null) {
            throw new IllegalArgumentException("Order ID cannot be null");
        }

        Order order = orderRepository.findById(invoiceDTO.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order no encontrado con id: " + invoiceDTO.getOrderId()));

        Invoice invoice = InvoiceMapper.mapInvoiceDTOToInvoice(invoiceDTO);
        invoice.setOrder(order);
        Invoice savedInvoice = invoiceRepository.save(invoice);

        return InvoiceMapper.mapInvoiceToInvoiceDTO(savedInvoice);
    }

    @Override
    public InvoiceDTO updateInvoice(Long id, InvoiceDTO invoiceDTO) {
        Invoice invoice = verifyInvoice(id);

        invoice.setInvoiceCode(invoiceDTO.getInvoiceCode());
        invoice.setDescription(invoiceDTO.getDescription());
        Invoice updatedInvoice = invoiceRepository.save(invoice);
        return InvoiceMapper.mapInvoiceToInvoiceDTO(updatedInvoice);
    }

    @Override
    public String deleteInvoice(Long id) {
        Invoice invoice = verifyInvoice(id);
        invoiceRepository.delete(invoice);
        return "Deleted successfully";
    }

    @Override
    public List<InvoiceDTO> getAllInvoices(Long id) {
        return invoiceRepository.findAll()
                .stream()
                .map(InvoiceMapper::mapInvoiceToInvoiceDTO)
                .collect(Collectors.toList());
    }

    @Override
    public InvoiceDTO getInvoice(Long id) {
        Invoice invoice = verifyInvoice(id);
        return InvoiceMapper.mapInvoiceToInvoiceDTO(invoice);
    }

    @Override
    public InvoiceDTO getInvoiceByOrderId(Long orderId) {
        Invoice invoice = invoiceRepository.findByOrder_Id(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found"));
        return InvoiceMapper.mapInvoiceToInvoiceDTO(invoice);
    }
}
